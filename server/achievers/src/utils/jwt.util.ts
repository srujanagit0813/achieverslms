import { JwtService } from '@nestjs/jwt';

export function generateToken(user: any, jwtService: JwtService) {
  return jwtService.sign({
    sub: user.id,
    email: user.email,
    role: user.role,
  });
}
