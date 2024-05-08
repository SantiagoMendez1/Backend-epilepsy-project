import {
  Body,
  Controller,
  Post,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../services/auth.service';
import { JwtDto } from '../dtos/jwt.dto';
import { RegisterDto } from '../dtos/register.dto';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req): Promise<JwtDto> {
    return this.authService.login(req.user);
  }

  @Post('register')
  async register(
    @Body() register: RegisterDto,
    @Res() response: Response,
  ): Promise<object> {
    const cretedUser = await this.authService.register(register);
    if (cretedUser) {
      return response.status(201).json({
        status: 'OK',
        message: 'Created User',
      });
    }
  }
}
