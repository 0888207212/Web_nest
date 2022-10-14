import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export enum UserRole{
    ADMIN = 'admin',
    MANAGER = 'manager',
    USER = 'user'
}

@Entity({ name: 'users' })
export class UserEntity  extends BaseEntity{
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    userName: string;

    @Column()
    passWord: string;

    @Column()
    email: string;

    @ApiProperty({ enum: UserRole})
    @Column({type: 'enum', enum: UserRole, default: UserRole.USER})
    role: UserRole;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}