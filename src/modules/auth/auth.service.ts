
import { generateAccessToken, generateEmailVerificationToken, generateRefreshToken, verifyToken } from "@/utils/jwt";
import { LoginDTO, RegisterDTO, TokenResponse } from "./auth.dto";
import bcrypt from 'bcrypt';
import { UnauthorizedError } from "@/errors/UnauthorizedError";
import { UserRepository } from "../user/user.respository";
import { hashPassword } from "@/utils/hash";
import { UserMapper } from "../user/user.mapper";
import { EmailService } from "../email/email.service";
import { AuthRepository } from "./auth.repository";
import { ENV } from "@/utils/constants";
import { buildVerificationLink } from "@/utils/linkBuilder";
import { TokenType } from "@prisma/client";
import { NotFoundError } from "@/errors/NotFoundError";
import { BadRequestError } from "@/errors/BadRequestError";
import { UserResponseDTO } from "../user/user.dto";


const INVALID_CREDENTIALS = "Invalid credentials";
const daysToVerifyEmail = ENV.DAYS_TO_VERIFY_EMAIL;
const daysToVerifyToken = ENV.DAYS_TO_REFRESH_TOKEN;
export class AuthService {
    constructor(
        private readonly userRepository:UserRepository, 
        private readonly emailService:EmailService,
        private readonly authRepository:AuthRepository
    ){}

    
    async login(data: LoginDTO): Promise<TokenResponse> {
        const { email, password } = data;
        const user = await this.userRepository.getByEmail(email);
        const isMatch = user && await bcrypt.compare(password, user.password);
        if(!user || !user.isActive || user.isDeleted || !isMatch) {
            throw new UnauthorizedError(INVALID_CREDENTIALS)
        }

        const payload = { userId: user.id, email: user.email };

        const accessToken = generateAccessToken(payload)
        const refreshToken = generateRefreshToken(payload)
        await this.authRepository.saveRefreshToken(user.id!, refreshToken, daysToVerifyToken);
        return {accessToken, refreshToken}
    }

    async register(data: RegisterDTO): Promise<UserResponseDTO> {
        const hashedPassword = await hashPassword(data.password);
        const userEntity = UserMapper.toEntityFromDTORegister({...data, password: hashedPassword});
        const userCreated = await this.userRepository.create(userEntity);
        const payload = { userId: userCreated.id, email: userCreated.email };
        const emailVerificationToken = generateEmailVerificationToken(payload);
        
        await this.authRepository.saveVerificationToken(userCreated.id!, emailVerificationToken, TokenType.EMAIL_VERIFICATION, daysToVerifyEmail);
        const link = buildVerificationLink(emailVerificationToken, "verify-email");
        await this.emailService.sendVerificationEmail(userCreated.email, link);
        
        return UserMapper.toDTOFromEntity(userCreated);
    }

    async verifyEmail(token:string): Promise<void>{
        const savedToken = await this.authRepository.getValidToken(token, TokenType.EMAIL_VERIFICATION);

        if (!savedToken) throw new NotFoundError("Token");

        const user = await this.userRepository.getById(savedToken.userId);
        if (!user) throw new NotFoundError("User");
        if (user.isActive) throw new BadRequestError("User already verified");

        await this.userRepository.update(user.id!, { isActive: true });
        await this.authRepository.markTokenAsUsed(savedToken.id);
    }

    async forgotPassword(email:string): Promise<void> {
        const user = await this.userRepository.getByEmail(email);
        if (!user || user.isDeleted) throw new NotFoundError("User");
        const token = generateEmailVerificationToken({ userId: user.id, email });
        const link = buildVerificationLink(token, "reset-password");
        const hoursToReset = 60 * 60 * 1000; // 1 hour
        
        await this.authRepository.saveVerificationToken(user.id!, token, TokenType.RESET_PASSWORD, hoursToReset);
        await this.emailService.sendResetPasswordEmail(user.email, link);
    }

    async resetPassword(token:string, newPassword:string): Promise<void> {
        const savedToken = await this.authRepository.getValidToken(token, TokenType.RESET_PASSWORD);
        if (!savedToken) throw new NotFoundError("Token");

        const user = await this.userRepository.getById(savedToken.userId);
        if (!user) throw new NotFoundError("User");

        const hashed = await hashPassword(newPassword);
        await this.userRepository.updatePassword(user.id!, hashed);
        await this.authRepository.markTokenAsUsed(savedToken.id);
    }

    async refreshToken(refreshToken:string): Promise<TokenResponse> {
        const savedRefreshToken = await this.authRepository.getRefreshToken(refreshToken);
        if (!savedRefreshToken) throw new UnauthorizedError("Refresh token is invalid or has expired");;
        const user = await this.userRepository.getById(savedRefreshToken.userId);
        if (!user || user.isDeleted) throw new NotFoundError("User");

        await this.authRepository.revokeRefreshToken(savedRefreshToken.id);

        const payload = { userId: user.id, email: user.email };
        const accessToken = generateAccessToken(payload);
        const newRefreshToken = generateRefreshToken(payload);
        await this.authRepository.saveRefreshToken(user.id!, newRefreshToken, daysToVerifyToken);
        return { accessToken, refreshToken: newRefreshToken };
    }

    async logout(refreshToken:string): Promise<void> {
        const savedToken = await this.authRepository.getRefreshToken(refreshToken);
        console.log(savedToken);
        
        if(!savedToken) throw new NotFoundError("Refresh token");

        const user = await this.userRepository.getById(savedToken.userId);
        if (!user || user.isDeleted) throw new NotFoundError("User");

        await this.authRepository.revokeRefreshToken(savedToken.id);
    }

    async getProfile(userId: number): Promise<UserResponseDTO>{
        const user = await this.userRepository.getById(userId);
        if (!user || user.isDeleted) throw new NotFoundError("User");
        return UserMapper.toDTOFromEntity(user);
    }
}