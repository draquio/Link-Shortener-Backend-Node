import { ResponseHelper } from "@/helpers/responseHelper";
import { Request, Response } from "express";
import { LoginDTO, TokenResponse } from "./auth.dto";
import { AuthService } from "./auth.service";

export class AuthController {

  constructor(private readonly authService:AuthService){}
  
  async login(req: Request, res: Response) {
    const loginDTO = req.body satisfies LoginDTO;
    const tokens: TokenResponse = await this.authService.login(loginDTO);
    const response = ResponseHelper.success(tokens);
    res.json(response);
  }
}
