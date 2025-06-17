import { ResponseHelper } from "@/helpers/responseHelper";
import { Request, Response } from "express";
import { LoginSchema, TokenResponse } from "./auth.dto";
import { AuthService } from "./auth.service";

export class AuthController {

  constructor(private readonly authService:AuthService){}
  
  async login(req: Request, res: Response) {
    const loginDTO = LoginSchema.parse(req.body);
    const tokens: TokenResponse = await this.authService.login(loginDTO);
    const response = ResponseHelper.success(tokens);
    res.json(response);
  }
}
