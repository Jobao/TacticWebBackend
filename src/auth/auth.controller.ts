import { Body, Controller, Get, Post, Req, Res, Response, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { Public } from './public.decorator';
import { SignupDto } from './dto/signup.dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthHTTPGuard } from './authHTTP.guard';
import { Request } from 'express';
import { CustomResponseType } from 'src/response/responseType';

@Controller('')
@ApiTags('Auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('login')
  async login(@Body() payload: LoginDto, @Req() request: Request) {
    let loginAttemp = await this.authService.login(payload);
    if (loginAttemp.status === 'OK') {
      request.res.setHeader('Set-Cookie', `token=${loginAttemp.data.access_token}; HttpOnly; Secure`);
    }
    return loginAttemp;
  }

  @Public()
  @Post('signup')
  async signup(@Body() payload: SignupDto) {
    return await this.authService.signup(payload);
  }
  @UseGuards(AuthHTTPGuard)
  @Get('ping')
  async ping() {
    return { status: 'ok' };
  }
}
