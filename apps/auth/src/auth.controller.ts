import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { CurrentUser } from '@app/shared/decorators';
import { Response } from 'express';
import { UserDocument } from './users/models/user.schema';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(
    @CurrentUser() user: UserDocument,
    @Res({ passthrough: true }) res: Response,
  ) {
    console.log('login', user);
    console.log('login', res);
    await this.authService.login(user, res);
    res.send(user);
  }

  @Get('session')
  @UseGuards(JwtAuthGuard)
  async authenticate(@CurrentUser() user: UserDocument) {
    console.log('session', user);
    return user;
  }
}
