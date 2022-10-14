import { BadRequestException, CanActivate, ExecutionContext, forwardRef, Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { UserRole } from "src/users/entitys/user.entity";

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
      private reflector: Reflector,
  ) {}
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const roles = this.reflector.getAllAndOverride<UserRole[]>('roles', [
          context.getHandler(),
          context.getClass
        ]);

        if(!roles){
            return true;
        }
       
        const { user } = context.switchToHttp().getRequest();
        if(!user) return false;
        return roles.some((role) => user.role?.includes(role));
     }

    //  async validateToken(auth: string) {
    //   try {
    //     if (auth.split(' ')[0] !== 'Bearer')
    //       throw new BadRequestException('Invalid token');
  
    //     const token = auth.split(' ')[1];
    //     const decoded = await jwt.verify(token, 'secret');
  
    //     return decoded;
    //   } catch (error) {
    //     console.log('validateToken error: ', error);
    //     throw new BadRequestException('Invalid token');
    //   }
      // try{
      //   const cookie = res.cookies['token'];
      //   const decoded = await this.jwtService.verifyAsync(cookie);

      //   if(!decoded){
      //     throw new UnauthorizedException;
      //   }

      //   return decoded;
      // }catch(err){
      //   console.log(err);
      //   throw new UnauthorizedException
      // }
    // }
}