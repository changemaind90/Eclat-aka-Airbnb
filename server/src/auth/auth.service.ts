import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/users/users.service';
import { RegisterDto } from './dtos/register.dto';
import { User } from '@prisma/client';
import { LoginDto } from './dtos/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService
  ) {}

  async register(registerDto: RegisterDto) {
    const candidate = await this.usersService.findByEmail(registerDto.email);

    let user;

    if (candidate) {
        if (!candidate.passwordHash) {
          console.log("kuku");
          user = await this.usersService.updateUser(registerDto);
        } else {
          throw new ConflictException('User already exist');
        }
    } else {
      user = await this.usersService.createUser(registerDto);
    }
    const tokens = await this.generateTokens(user);
    await this.usersService.setRefreshToken(user.id, tokens.refreshToken);
    return tokens;
  }

  async login(loginDto: LoginDto) {
    // const user = await this.usersService.validateUser(loginDto.email, loginDto.password);
    const user = await this.usersService.findByEmail(loginDto.email);

    if (user && !user.passwordHash) {
      throw new UnauthorizedException();
    }

    if (!(user && await bcrypt.compare(loginDto.password, user.passwordHash))) {
      throw new UnauthorizedException();
    }

    const tokens = await this.generateTokens(user);
    await this.usersService.setRefreshToken(user.id, tokens.refreshToken);
    return tokens;
  }

  async logout(userId: number) {
    await this.usersService.removeRefreshToken(userId);
  }

  async refreshTokens(userId: number, refreshToken: string) {
    const user = await this.usersService.findById(userId);
    if (!user || !user.refreshToken) throw new Error('Access Denied');

    const isMatch = await bcrypt.compare(refreshToken, user.refreshToken);
    if (!isMatch) throw new Error('Access Denied');

    const tokens = await this.generateTokens(user);
    await this.usersService.setRefreshToken(user.id, tokens.refreshToken);
    return tokens;
  }

  private async generateTokens(user: User) {
    const payload = { id: user.id, email: user.email };

    const accessToken = await this.jwtService.signAsync(payload, {
      secret: 'access_secret',
      expiresIn: '15m',
    });

    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: 'refresh_secret',
      expiresIn: '7d',
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  async oauthLogin(email) {
    let user = await this.usersService.findByEmail(email);
    
    if (!user) {
      user = await this.usersService.createUser({email});
    }

    const tokens = await this.generateTokens(user);
    await this.usersService.setRefreshToken(user.id, tokens.refreshToken);
    return tokens;
  }
}
