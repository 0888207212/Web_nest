import { FindEmailUserDto } from './../users/dto/forgot-password-user.dto';
import { Repository } from 'typeorm';
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { UserEntity } from 'src/users/entitys/user.entity';
// import { UsersRepository } from 'src/users/repositoris/user.repository';

@Injectable()
export class AuthService {
  private saltOrRounds = 10;
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository:  Repository<UserEntity>,
    private jwtService: JwtService,
  ) {}

  async getAllUser( ): Promise<UserEntity[]> {
    try {
      // const cookie = res.cookies['token'];
      // const data = await this.jwtService.verifyAsync(cookie);

      // if (!data) {
      //   throw new UnauthorizedException();
      // }

      const user = await this.usersRepository.find();

      // const { ...result } = user;
      return user;
    } catch (err) {
      console.log(err);
      throw new UnauthorizedException();
    }
  }

  async createUser(createUser: Record<string, any>): Promise<any> {
    const userOld = await this.usersRepository.findOneBy({ userName: createUser.userName })
    if(userOld) {
      throw new BadRequestException('This account already exists');
    } 

    const emailOld = await this.usersRepository.findOneBy({ email: createUser.email })
    if(emailOld) {
      throw new BadRequestException('This email already exists');
    } 

    const hashedPassWord = await bcrypt.hash(
      createUser.passWord,
      this.saltOrRounds,
    );
    const user = { ...createUser, passWord: hashedPassWord };

    const data = await this.usersRepository.save(user);
    return {
      message: 'Create Success',
      user: data,
    };
  }

  async findEmail(email: FindEmailUserDto) {
    const User = await this.usersRepository.findOneBy({
      email: email.email,
    });
    console.log(User)

    if (!User) {
      throw new BadRequestException('Email does not exist');
    }
    console.log('email', email)
    if(email.newPassWord !== email.confirmPassWord) {
      throw new BadRequestException('confirm password error');
    }

    const hashedNewPassWord = await bcrypt.hash(email.newPassWord, this.saltOrRounds);
    const user = { ...User, passWord: hashedNewPassWord };
    await this.usersRepository.update(User.id, user);
    console.log('new user', user)

    return {
      message: 'Changed Password Success',
      username: user.userName,
      password: email.newPassWord,
      email: user.email
    };
  }

  async updateUSer(id: string, data: Record<string, any>): Promise<any> {
    const hashedPassWord = await bcrypt.hash(data.passWord, this.saltOrRounds);
    const user = { ...data, passWord: hashedPassWord };
    await this.usersRepository.update(id, user);
    return {
      message: 'User Updated',
      user: data,
    };
  }
  
  async findUser(user: Record<string, any>, res: any): Promise<any> {
    const User = await this.usersRepository.findOneBy({
      userName: user.userName,
    });
    if (!User) {
      throw new BadRequestException('invalid credentials');
    }

    if (!(await bcrypt.compare(user.passWord, User.passWord))) {
      throw new BadRequestException('invalid credentials');
    }

    const token = await this.jwtService.signAsync({ ...User });
    res.cookie('token', token, { httpOnly: true, secure: true });
    return {
      message: 'Login User Success',
      token: token,
    };
  }

  async getUser(res: any, role: any): Promise<any> {
    try {
      const cookie = res.cookies['token'];
      const data = await this.jwtService.verifyAsync(cookie);

      if (!data) {
        throw new UnauthorizedException();
      }

      const user = await this.usersRepository.findOneBy({ role: role });

      const { passWord, ...result } = user;
      return result;
    } catch (err) {
      console.log(err);
      throw new UnauthorizedException();
    }
  }

  async logOutUser(res: any): Promise<any> {
    try {
      res.clearCookie('token');

      return {
        message: 'Cleared cookie',
      };
    } catch (err) {
      console.log(err);
      throw new UnauthorizedException();
    }
  }
}
