import { ENV } from "./constants";

export const buildVerificationLink = (token: string, endpoint:string): string =>
  `${ENV.URL_BASE}/api/v1/auth/${endpoint}?token=${token}`;