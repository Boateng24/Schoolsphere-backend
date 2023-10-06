import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '../@types/types'; // adjust the import as necessary

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  // private readonly logger = new Logger(RoleGuard.name);

  async canActivate(context: ExecutionContext): Promise<boolean> {
    console.log('RoleGuard canActivate triggered');
    const roles = this.reflector.get<Role[]>('roles', context.getHandler());
    const request = context.switchToHttp().getRequest();
    const user = request?.user;
    console.log('Current User:', user);

    if (!roles) {
      // If no roles are assigned, anyone can access the route
      return true;
    }

    if (!user) {
      throw new ForbiddenException(
        'Authentication is required to access this resource',
      );
    }

    const hasRole = roles.includes(user?.role);
    console.log('User has required role:', hasRole);
    if (!hasRole) {
      throw new ForbiddenException(
        'You do not have permission to access this resource',
      );
    }

    return true;
  }
}
