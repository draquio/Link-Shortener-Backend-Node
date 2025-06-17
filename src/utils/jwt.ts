import jwt, { SignOptions } from "jsonwebtoken"
import { ENV } from "./constants";

const jwtSecret = ENV.JWT_SECRET
const accessTokenOptions: SignOptions = { expiresIn: "1h" };
const refreshTokenOptions: SignOptions = { expiresIn: "7d" };

export const generateAccessToken = (payload: object): string => {
  return jwt.sign(payload, jwtSecret, accessTokenOptions as SignOptions);
};

export const generateRefreshToken = (payload: object): string => {
  return jwt.sign(payload, jwtSecret, refreshTokenOptions as SignOptions);
};