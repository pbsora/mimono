import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { LocalAuthGuard } from './guard/local-auth.guard';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guard/jwt-auth.guard';
import { RequestWithUser } from './types/request-user.type';
import { ChangeEmailDto, EmailCodeDto } from './dto/change-email.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req: RequestWithUser) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req: RequestWithUser) {
    return req.user;
  }

  @UseGuards(JwtAuthGuard)
  @Post('password-code')
  async generatePasswordCode(
    @Request() req: RequestWithUser,
    @Body() body: { email: string },
  ) {
    const res = await this.authService.generatePasswordResetCode(
      req.user,
      body.email,
    );

    return res.emailSent;
  }

  @UseGuards(JwtAuthGuard)
  @Patch('change-password')
  async changePassword(
    @Request() req: RequestWithUser,
    @Body() body: { newPassword: string; verificationCode: string },
  ) {
    return this.authService.changePassword(
      req.user.id,
      body.newPassword,
      body.verificationCode,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Post('email-code')
  async generateEmailCode(
    @Request() req: RequestWithUser,
    @Body() body: EmailCodeDto,
  ) {
    const res = await this.authService.generateEmailChangeCodes(
      req.user,
      body.oldEmail,
      body.newEmail,
    );

    return (
      (res.newEmailSent && res.oldEmailSent) || {
        message: 'Something went wrong, please try again in a few minutes!',
      }
    );
  }

  @UseGuards(JwtAuthGuard)
  @Patch('change-email')
  async changeEmail(
    @Request() req: RequestWithUser,
    @Body()
    body: ChangeEmailDto,
  ) {
    return this.authService.changeEmail(
      req.user.id,
      body.newEmail,
      body.oldVerificationCode,
      body.newVerificationCode,
    );
  }

  // @UseGuards(JwtAuthGuard)
  // @Post('send-email')
  // async sendEmail(
  //   @Request() req: RequestWithUser,
  //   @Body() body: { email: string },
  // )
  //   const { email } = body;
  //   return this.authService.sendEmail(email);
  // }
}
