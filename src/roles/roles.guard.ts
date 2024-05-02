import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';

import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';

import { Role } from './roles.enum';
import { ROLES_KEY } from './roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {} // Inject Reflector

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const requiredRole = this.reflector.getAllAndOverride<Role>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    console.log('requiredRole', requiredRole);
    if (!requiredRole) {
      return true;
    }
    const { user } = context.switchToHttp().getRequest();

    if (requiredRole === Role.CurrentUser) {
      const currentUser =
        parseInt(user.userId) ===
        parseInt(context.switchToHttp().getRequest().params.userId);
      console.log('params', context.switchToHttp().getRequest().params.userId);
      console.log('user.userId', user.userId);
      if (currentUser) {
        return true;
      }
    }

    return requiredRole === user.roles;
  }
}
