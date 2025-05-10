import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../db/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../../generated/prisma';
import { JwtPayload } from './types/jwt-payload.type';
import * as bcrypt from 'bcrypt';
import * as nodemailer from 'nodemailer';

type Result = {
  id: string;
  email: string;
  username: string;
};

@Injectable()
export class AuthService {
  private transporter: nodemailer.Transporter;
  constructor(
    private readonly prisma: PrismaService,
    private jwtService: JwtService,
  ) {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }

  async validateUser(
    username: string,
    password: string,
  ): Promise<Result | null> {
    const user = await this.prisma.user.findUnique({
      where: { username },
    });
    if (user && (await bcrypt.compare(password, user.password))) {
      const result: Result = {
        id: user.id,
        username: user.username,
        email: user.email,
      };
      return result;
    }
    return null;
  }

  async login(user: User) {
    const payload: JwtPayload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async generatePasswordResetCode(
    user: User,
    subject: string,
  ): Promise<{ code: string; emailSent: boolean }> {
    // Check if user has recently requested a code
    const recentCode = await this.prisma.authCode.findFirst({
      where: {
        userId: user.id,
        type: 'PASSWORD_RESET',
        createdAt: {
          gt: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes
        },
      },
    });

    if (recentCode) {
      throw new BadRequestException(
        'Please wait 5 minutes before requesting another code',
      );
    }

    // Clean up any existing unused codes for this user
    await this.prisma.authCode.updateMany({
      where: {
        userId: user.id,
        type: 'PASSWORD_RESET',
        used: false,
      },
      data: {
        used: true,
      },
    });

    const code = this.generateRandomCode();
    const expiresAt = new Date();
    expiresAt.setMinutes(expiresAt.getMinutes() + 30); // 30 minutes expiration

    const createdCode = await this.prisma.authCode.create({
      data: {
        code,
        userId: user.id,
        type: 'PASSWORD_RESET',
        expiresAt,
        used: false,
      },
    });

    if (!createdCode) {
      throw new Error('Failed to create password reset code');
    }

    const emailSent = await this.sendEmail(
      subject,
      'Password Reset',
      `Your reset code is: ${code}`,
    );

    return { code, emailSent };
  }
  generateRandomCode() {
    return Math.random().toString(36).substring(2, 8);
  }

  async validateCode(code: string, userId: string) {
    const codeExists = await this.prisma.authCode.findFirst({
      where: {
        code,
        used: false,
        userId,
        expiresAt: {
          gt: new Date(),
        },
        type: 'PASSWORD_RESET',
      },
    });

    if (!codeExists) {
      throw new BadRequestException('Invalid code.');
    }
    await this.prisma.authCode.update({
      where: { id: codeExists.id },
      data: { used: true },
    });
    return true;
  }

  async changePassword(
    userId: string,
    newPassword: string,
    verificationCode: string,
  ) {
    const isCodeValid = await this.validateCode(verificationCode, userId);
    if (!isCodeValid) {
      throw new BadRequestException('Invalid verification code');
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const res = await this.prisma.user.update({
      where: { id: userId },
      data: { password: hashedPassword },
    });

    if (res) {
      return true;
    }
    return false;
  }

  async sendEmail(
    to: string,
    subject?: string,
    content?: string,
  ): Promise<boolean> {
    try {
      const result = await this.transporter.sendMail({
        from: `"Mimono" <${process.env.EMAIL_USER}>`,
        to,
        subject,
        html: `<b>${content}</b>`, // html body
      });

      return !!result;
    } catch (error: unknown) {
      // Type guard to ensure error is Error instance
      if (error instanceof Error) {
        throw new Error(`Error sending email: ${error.message}`);
      }
      // Generic error message for non-Error objects
      throw new Error('An unknown error occurred while sending email');
    }
  }
}
