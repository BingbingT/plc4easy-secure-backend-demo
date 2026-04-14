import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

export interface JwtPayload {
  sub: string;
  email: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey:
        process.env.JWT_SECRET ??
        (() => {
          throw new Error('JWT_SECRET not set');
        })(),
    });
  }

  validate(payload: JwtPayload): JwtPayload {
    // Return value is attached to request.user
    return { sub: payload.sub, email: payload.email };
  }
}
