import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { JwtDto } from '../dtos/jwt.dto';
import { RegisterDto } from '../dtos/register.dto';
import { Response } from 'express';
import { LocalAuthGuard } from '../guards/local-auth.guard';
import { Public } from 'src/decorators/public.decorator';

@Public()
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Request() req): Promise<JwtDto> {
    return this.authService.login(req.user);
  }

  @Post('register')
  @HttpCode(HttpStatus.OK)
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
