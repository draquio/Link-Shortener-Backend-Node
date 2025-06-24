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

export const generateEmailVerificationToken = (payload: object): string => {
  const options: SignOptions = { expiresIn: "30d" };
  return jwt.sign(payload, jwtSecret, options);
};


export const verifyToken = <T = any>(token: string): T => {
  try {
    return jwt.verify(token, jwtSecret) as T;
  } catch (err) {
    throw new Error("Invalid or expired token");
  }
};