import { forgotPasswordTemplate } from "@/templates/forgotPasswordTemplate";
import { verifyEmailTemplate } from "@/templates/verifyEmailTemplate";
import { ENV } from "@/utils/constants";
import nodemailer from "nodemailer";

export class EmailService {
  private transporter = nodemailer.createTransport({
    host: ENV.EMAIL.HOST,
    port: ENV.EMAIL.PORT,
    secure: false,
    auth: {
      user: ENV.EMAIL.USER,
      pass: ENV.EMAIL.PASS,
    },
  });

  async sendVerificationEmail(to: string, link: string): Promise<void> {
    try {
      const html = verifyEmailTemplate(link);
      await this.transporter.sendMail({
        from: `"No Reply" <${ENV.EMAIL.USER}>`,
        to,
        subject: "Email Verification",
        html,
      });
    } catch (error) {
      console.error("Error al enviar email:", error);
      throw error;
    }
  }
  async sendResetPasswordEmail(to: string, link: string): Promise<void> {
    try {
      const html = forgotPasswordTemplate(link);
      await this.transporter.sendMail({
        from: `"No Reply" <${to}>`,
        to,
        subject: "Reset your password",
        html: html,
      });
    } catch (error) {
      console.error("Error al enviar email:", error);
      throw error;
    }
  }
}
