import { Injectable } from '@nestjs/common';
import { PrismaService } from '../db/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../../generated/prisma';
import { JwtPayload } from './types/jwt-payload.type';
import * as bcrypt from 'bcrypt';

type Result = {
  id: string;
  email: string;
  username: string;
};

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

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
}
