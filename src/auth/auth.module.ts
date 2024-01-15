import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants/constants';
import { MongooseModule } from '@nestjs/mongoose';
import { MongodbModule } from 'src/mongodb/mongodb.module';
import { UserModule } from 'src/user/user.module';
import { CacheModule } from 'src/game-cache/cache.module';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '8h' },
    }),
    MongodbModule,
    UserModule,
    MongooseModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
