import { Injectable } from "@nestjs/common";
import { PrismaService } from "prisma/prisma.service";
import * as bcrypt from "bcrypt";
import { User } from "@prisma/client";
import { CreateUserDto } from "./dtos/create-user.dto";

@Injectable()
export class UsersService {

    constructor(private prisma: PrismaService){}

    async findByEmail(email: string) {
        return await this.prisma.user.findFirst({where: {email}});
    }

    async findById(id: number) {
        return await this.prisma.user.findFirst({where: {id}});
    }

    async createUser(createUserDto: CreateUserDto): Promise<User> {
        const passwordHash =
        createUserDto.password ? await bcrypt.hash(createUserDto.password, 10) : null;
        return await this.prisma.user.create({
            data: {
                email: createUserDto.email,
                passwordHash,
            }
        });
    }

    async updateUser(updateUserDto: UpdateUserDto): Promise<User> {
        const passwordHash = await bcrypt.hash(updateUserDto.password, 10);
        return await this.prisma.user.update({
            where: {
                email: updateUserDto.email
            },
            data: {
                passwordHash,
            }
        });
    }

    async setRefreshToken(id: number, token: string) {
        const refreshToken = await bcrypt.hash(token, 10);
        await this.prisma.user.update({where: {id}, 
            data: {
                refreshToken
            }
        });
    }

    async removeRefreshToken(id: number) {
        await this.prisma.user.update({where: {id}, 
            data: {
                refreshToken: null
            }
        });
    }
}
