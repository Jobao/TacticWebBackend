import { Body, Controller, Post} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { Public } from './public.decorator';
import { SignupDto } from './dto/signup.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('')
@ApiTags('Auth')
export class AuthController {
    constructor(private authService: AuthService){}

    @Public()
    @Post('login')
    async login(@Body() payload: LoginDto){
       return this.authService.login(payload);
    }

    @Public()
    @Post('signup')
    async signup(@Body() payload: SignupDto){
        this.authService.signup(payload);
    }
}
