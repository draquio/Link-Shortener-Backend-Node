
import { generateAccessToken, generateRefreshToken } from "@/utils/jwt";
import { LoginDTO } from "./auth.dto";
import bcrypt from 'bcrypt';
import { UnauthorizedError } from "@/errors/UnauthorizedError";
import { UserRepository } from "../user/user.respository";


const INVALID_CREDENTIALS = "Invalid credentials";
export class AuthService {
    constructor(private readonly userRepository:UserRepository){}

    
    async login(data: LoginDTO) {
        const {email, password} = data;
        const user = await this.userRepository.getByEmail(email);
        if(!user || !user.isActive || user.isDeleted) throw new UnauthorizedError(INVALID_CREDENTIALS)
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) throw new UnauthorizedError(INVALID_CREDENTIALS)
        const payload = { userId: user.id, email: user.email };

        const accessToken = generateAccessToken(payload)
        const refreshToken = generateRefreshToken(payload)
        return {accessToken, refreshToken}
    }
}