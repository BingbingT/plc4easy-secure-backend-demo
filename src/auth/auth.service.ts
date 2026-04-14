import { Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async login(dto: LoginDto): Promise<{ access_token: string }> {
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminHash = process.env.ADMIN_PASSWORD_HASH;

    if (!adminEmail || !adminHash) {
      throw new InternalServerErrorException(
        'Admin credentials are not configured in environment variables',
      );
    }

    const emailMatches = dto.email === adminEmail;
    const passwordMatches = await bcrypt.compare(dto.password, adminHash);

    // Constant-time-safe: always compare both to avoid timing leaks
    if (!emailMatches || !passwordMatches) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { sub: 'admin', email: adminEmail };
    return { access_token: this.jwtService.sign(payload) };
  }
}
