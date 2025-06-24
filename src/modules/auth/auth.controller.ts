import { ResponseHelper } from "@/helpers/responseHelper";
import { Request, Response } from "express";
import { ForgotPasswordDTO, LoginDTO, RefreshTokenDTO, RegisterDTO, ResetPasswordDTO, TokenDTO, TokenResponse, TokenSchema } from "./auth.dto";
import { AuthService } from "./auth.service";
import { RequestWithUser } from "@/types/Responses";
import { TokenValidator } from "@/validators/token.validator";

export class AuthController {

  constructor(private readonly authService:AuthService){}
  
  async login(req: Request, res: Response) {
    const loginDTO = req.body satisfies LoginDTO;
    const tokens: TokenResponse = await this.authService.login(loginDTO);
    const response = ResponseHelper.success(tokens, "Login successful");
    res.status(200).json(response);
  }

  async register(req: Request, res: Response){
    const registerDTO = req.body satisfies RegisterDTO;
    const user = await this.authService.register(registerDTO);
    const response = ResponseHelper.success(user, "User registered successfully. Please verify your email.");
    res.status(201).json(response);
  }

  async verifyEmail(req: Request, res: Response) {
    const token = TokenValidator.parse(req.query.token);
    const message = await this.authService.verifyEmail(token);
    const response = ResponseHelper.success(message, "Email verified successfully");
    res.status(200).json(response);
  }

  async forgotPassword(req: Request, res: Response) {
    const {email} = req.body satisfies ForgotPasswordDTO;
    await this.authService.forgotPassword(email);
    const response = ResponseHelper.success(null, "Password reset link sent to email");
    res.status(200).json(response);
  }

  async resetPassword(req: Request, res: Response) {
    const { token, password } = req.body satisfies ResetPasswordDTO;
    await this.authService.resetPassword(token, password);
    const response = ResponseHelper.success(null, "Password has been changed successfully");
    res.status(200).json(response);
  }

  async refreshToken(req: Request, res: Response) {
    const { refreshToken } = req.body satisfies RefreshTokenDTO;
    const tokens = await this.authService.refreshToken(refreshToken);
    const response = ResponseHelper.success(tokens, "Token refreshed successfully");
    res.status(200).json(response);
  }

  async logout(req: Request, res: Response) {
    const { refreshToken } = req.body satisfies RefreshTokenDTO;
    await this.authService.logout(refreshToken);
    const response = ResponseHelper.success(null, "Logout successful")
    res.status(200).json(response)
  }

  async me(req: Request, res: Response){
    const { userId } = (req as RequestWithUser).user;
    const user = await this.authService.getProfile(userId);
    const response = ResponseHelper.success(user, "User profile retrieved");
    res.status(200).json(response);
  }
}
