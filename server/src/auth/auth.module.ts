import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { UsersService } from "src/users/users.service";
import { JwtStrategy } from "./strategys/jwt.strategy";
import { JwtRefreshStrategy } from "./strategys/jwt-refresh.strategy";
import { AuthController } from "./auth.controller";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { PrismaService } from "prisma/prisma.service";
import { GoogleStrategy } from "./strategys/google.strategy";

@Module({
    imports: [
      PassportModule,
      JwtModule.register({}), // можно не передавать конфиг, т.к. signAsync будет с явными настройками
    ],
    controllers: [AuthController],
    providers: [
      AuthService,
      UsersService,
      JwtStrategy,
      JwtRefreshStrategy,
      PrismaService,
      GoogleStrategy
    ],
  })
  export class AuthModule {}
  