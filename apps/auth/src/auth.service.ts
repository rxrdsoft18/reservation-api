import { Injectable } from '@nestjs/common';
import { UserDocument } from './users/models/user.schema';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { TokenPayload } from "./interfaces/token-payload.interface";

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}
  async login(user: UserDocument, res: Response) {
    const tokenPayload: TokenPayload = {
      userId: user._id.toHexString(),
    };

    const expires = new Date();
    expires.setDate(
      expires.getDate() + this.configService.get<number>('JWT_EXPIRATION'),
    );

    const token = this.jwtService.sign(tokenPayload);
    res.cookie('Authentication', token, {
      httpOnly: true,
      expires,
    });
  }
}
