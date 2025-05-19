import { Injectable, Request } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor() {
    super({
      jwtFromRequest: (req) => {
        if (req && req.cookies) {
          return req.cookies.refreshToken;
        }
        return null;
      },
      secretOrKey: 'refresh_secret',
      passReqToCallback: true,
    });
  }

  validate(@Request() req: any, payload: any) {
    return { id: payload.id, email: payload.email, refreshToken: req.cookies.refreshToken };
  }
}
