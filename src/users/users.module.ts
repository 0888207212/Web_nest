import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { AuthModule } from 'src/auth/auth.module';
import { UsersController } from './users.controller';
// import { UsersRepository } from './repositoris/user.repository';
import { UserEntity } from './entitys/user.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([UserEntity]),
    forwardRef(() =>  AuthModule ),
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
