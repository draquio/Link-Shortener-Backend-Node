export const ENV = {
    PORT: process.env.PORT || 3000,
    JWT_SECRET: process.env.JWT_SECRET!,
    JWT_EXPIRES_IN: 3600,
    URL_BASE: "http://localhost:3000",
    DAYS_TO_VERIFY_EMAIL: 30 * 24 * 60 * 60 * 1000, // 30 Days
    DAYS_TO_REFRESH_TOKEN: 30 * 24 * 60 * 60 * 1000, // 30 Days
    EMAIL: {
        HOST: process.env.EMAIL_HOST || "smtp.example.com",
        PORT: parseInt(process.env.EMAIL_PORT || "587", 10),
        USER: process.env.EMAIL_USER || "",
        PASS: process.env.EMAIL_PASSWORD || "",
    },
    REDIS: {
        HOST: process.env.REDIS_HOST || '127.0.0.1',
        PORT: process.env.REDIS_PORT || 6379,
        PASSWORD: process.env.REDIS_PASSWORD || undefined,
    }
}