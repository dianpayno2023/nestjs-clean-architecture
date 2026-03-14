import { Body, Controller, Post } from '@nestjs/common';
import { LoginDto } from '../dto/login.dto';
import { RegisterDto } from '../dto/register.dto';
import { AuthTokenResponse } from '../interfaces/authtoken-response.interface';
import { AuthService } from '../services/auth.service';
import { ResponsePayload } from 'src/common/interfaces/api-response.interface';

@Controller('auth')
export class AuthController {
  constructor(private readonly svc: AuthService) { }

  @Post('register')
  async register(@Body() payload: RegisterDto): Promise<ResponsePayload<AuthTokenResponse>> {
    const result = await this.svc.register(payload);
    return {
      message: 'Register success',
      data: result,
      meta: null,
    };
  }

  @Post('login')
  async login(@Body() payload: LoginDto): Promise<ResponsePayload<AuthTokenResponse>> {
    const result = await this.svc.login(payload);
    return {
      message: 'Login success',
      data: result,
      meta: null,
    };
  }
}
