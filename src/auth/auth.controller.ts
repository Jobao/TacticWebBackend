import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  Response,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { Public } from './public.decorator';
import { SignupDto } from './dto/signup.dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthHTTPGuard } from './authHTTP.guard';
import { Request } from 'express';

@Controller('')
@ApiTags('Auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('login')
  async login(@Body() payload: LoginDto, @Req() request: Request) {
    let v = await this.authService.login(payload);
    request.res.setHeader(
      'Set-Cookie',
      `token=${v.access_token}; HttpOnly; Secure`,
    );
    //Estoy cambiiando para que devuelva el repsonse
    return v;
  }

  @Public()
  @Post('signup')
  async signup(@Body() payload: SignupDto) {
    this.authService.signup(payload);
  }
  @UseGuards(AuthHTTPGuard)
  @Get('ping')
  async ping() {
    return { status: 'ok' };
  }
}
