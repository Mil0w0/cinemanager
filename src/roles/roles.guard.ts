import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';

import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';

import { Role } from './roles.enum';
import { ROLES_KEY } from './roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  private readonly secretKey = process.env.JWT_SECRET;
  constructor(private readonly reflector: Reflector) {} // Inject Reflector

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }
    const { user } = context.switchToHttp().getRequest();
    return requiredRoles.some((role) => user.roles?.includes(role));
  }
}
