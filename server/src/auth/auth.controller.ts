import { Body, Controller, Get, Post, Request, Res, UnauthorizedException, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { AuthService } from "./auth.service";
import { RegisterDto } from "./dtos/register.dto";
import { LoginDto } from "./dtos/login.dto";
import { Response } from "express";
import { ApiHeaders, ApiResponse } from "@nestjs/swagger";

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiResponse({example: {token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OCwiZW1haWwiOiJzb21lQGdtYWlsLmNvbSIsImlhdCI6MTc0NjMxMDAxMiwiZXhwIjoxNzQ2MzEwOTEyfQ.u6rORAjy3q4wSaCNZ2ZiR5h8BNX1Z8DYOYd7yR_Tk6M"}})
  @Post('register')
  async register(@Body() dto: RegisterDto, @Res({ passthrough: true }) res: Response) {
    const tokens = await this.authService.register(dto);
    res.cookie("refreshToken", tokens.refreshToken, {
      httpOnly: true
    });
    res.send({token: tokens.accessToken});
  }
  
  @ApiResponse({example: {token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OCwiZW1haWwiOiJzb21lQGdtYWlsLmNvbSIsImlhdCI6MTc0NjMxMDAxMiwiZXhwIjoxNzQ2MzEwOTEyfQ.u6rORAjy3q4wSaCNZ2ZiR5h8BNX1Z8DYOYd7yR_Tk6M"}})
  @Post('login')
  async login(@Body() dto: LoginDto, @Res({ passthrough: true }) res: Response) {
    const tokens = await this.authService.login(dto);
    res.cookie("refreshToken", tokens.refreshToken, {
      httpOnly: true
    });
    res.send({token: tokens.accessToken});
  }
  
  @ApiHeaders([{name: "Bearer", example: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OCwiZW1haWwiOiJzb21lQGdtYWlsLmNvbSIsImlhdCI6MTc0NjMxMDAxMiwiZXhwIjoxNzQ2MzEwOTEyfQ.u6rORAjy3q4wSaCNZ2ZiR5h8BNX1Z8DYOYd7yR_Tk6M"}])
  @UseGuards(AuthGuard('jwt'))
  @Post('logout')
  logout(@Request() req, @Res({ passthrough: true }) res: Response) {
    res.clearCookie("refreshToken");
    return this.authService.logout(req.user.id);
  }
  
  @ApiResponse({example: {token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OCwiZW1haWwiOiJzb21lQGdtYWlsLmNvbSIsImlhdCI6MTc0NjMxMDAxMiwiZXhwIjoxNzQ2MzEwOTEyfQ.u6rORAjy3q4wSaCNZ2ZiR5h8BNX1Z8DYOYd7yR_Tk6M"}})
  @UseGuards(AuthGuard('jwt-refresh'))
  @Post('refresh')
  async refresh(@Request() req, @Res({ passthrough: true }) res: Response) {
    const tokens = await this.authService.refreshTokens(req.user.id, req.user.refreshToken);
    res.cookie("refreshToken", tokens.refreshToken, {
      httpOnly: true
    });
    res.send({token: tokens.accessToken});
  }
  
  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth() {
    // редирект на гугл
  }
  
  @ApiResponse({example: {token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OCwiZW1haWwiOiJzb21lQGdtYWlsLmNvbSIsImlhdCI6MTc0NjMxMDAxMiwiZXhwIjoxNzQ2MzEwOTEyfQ.u6rORAjy3q4wSaCNZ2ZiR5h8BNX1Z8DYOYd7yR_Tk6M"}})
  @Get('google/redirect')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Request() req, @Res({ passthrough: true }) res: Response) {
    const tokens = await this.authService.oauthLogin(req.user.email);
    res.cookie("refreshToken", tokens.refreshToken, {
        httpOnly: true
    });
    res.send({token: tokens.accessToken});
  }
}
