import { IsEmail, IsString } from 'class-validator';

export class EmailCodeDto {
  @IsEmail()
  oldEmail: string;
  @IsEmail()
  newEmail: string;
}

export class ChangeEmailDto {
  @IsEmail()
  newEmail: string;
  @IsString()
  oldVerificationCode: string;
  @IsString()
  newVerificationCode: string;
}
