import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { CAN_SKIP_AUTH_KEY } from '../users/users.controller';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  private readonly secretKey = process.env.JWT_SECRET;
  private reflector: Reflector;

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers['authorization'];

    const canSKipAuth = this.reflector.getAllAndOverride<boolean>(
      CAN_SKIP_AUTH_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (canSKipAuth) {
      return true;
    }

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return false;
    }

    const token = authHeader.split(' ')[1];

    try {
      const decoded = jwt.verify(token, this.secretKey);
      request.user = decoded; // Attach the decoded user to the request object
      return true;
    } catch (error) {
      return false;
    }
  }
}
