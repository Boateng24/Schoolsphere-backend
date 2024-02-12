import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authorization = request.headers.authorization;

    if (!authorization) {
      throw new UnauthorizedException('You are not logged in');
    }

    try {
      const token = authorization.split(' ')[1]; // Assuming token is in "Bearer <token>" format
      const decoded = await this.jwtService.verifyAsync(token);
      request.user = decoded; // Attaching user to request object
      return true;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
