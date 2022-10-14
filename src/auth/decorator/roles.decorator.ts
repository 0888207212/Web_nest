import { SetMetadata } from "@nestjs/common";
import { UserRole } from "src/users/entitys/user.entity";

export const Roles = (...roles: UserRole[]) => SetMetadata('roles', roles);