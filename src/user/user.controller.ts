import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUnitDto } from 'src/unit/dto/createUnit.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { AuthHTTPGuard } from 'src/auth/authHTTP.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@UseGuards(AuthHTTPGuard)
@Controller('user')
@ApiBearerAuth('JWT-auth')
@ApiTags('Users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('/unit')
  createNewUnit(@Body() payload: CreateUnitDto, @Req() req: Request) {
    payload.user_uuid = req['user'].sub;
    return this.userService.addNewUnit(payload);
  }

  @Get('/unit/:unit_uuid')
  getUnit(@Param('unit_uuid') unit_uuid: string, @Req() req: Request) {
    return this.userService.getUnit(req['user'].sub, unit_uuid);
  }

  @Get('/unit/:user_uuid/:unit_uuid')
  getUnitCustomUser(
    @Param('unit_uuid') unit_uuid: string,
    @Param('user_uuid') user_uuid: string,
  ) {
    return this.userService.getUnit(user_uuid, unit_uuid);
  }
}
