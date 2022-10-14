import { ConfigModule } from '@nestjs/config';
import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/users/entitys/user.entity';
// import { UsersRepository } from 'src/users/repositoris/user.repository';
import { UsersModule } from 'src/users/users.module';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-guard';
import { JwtStrategy } from './guards/jwt-strategy';
import { RolesGuard } from './guards/roles.guard';

@Module({
  imports:[
    ConfigModule.forRoot({ isGlobal: true, }),
    TypeOrmModule.forFeature([UserEntity]),
    forwardRef(() =>  UsersModule ),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {expiresIn: '3600s' }
    })
  ],
  providers: [AuthService, RolesGuard, JwtAuthGuard, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
