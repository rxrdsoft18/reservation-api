import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  Logger, UnauthorizedException
} from "@nestjs/common";
import { catchError, map, Observable, of, tap } from "rxjs";
import { AUTH_SERVICE } from '@app/shared/constants/services';
import { ClientProxy } from '@nestjs/microservices';
import { UserDto } from '@app/shared/dtos';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(@Inject(AUTH_SERVICE) private readonly authClient: ClientProxy) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    if (context.getType() !== 'http') {
      return false;
    }

    const jwt =
      context.switchToHttp().getRequest().cookies?.Authentication ||
      context.switchToHttp().getRequest().headers?.authentication;


    if (!jwt) {
      return false;
    }

    return this.authClient
      .send<UserDto>(
        { cmd: 'authenticate' },
        {
          Authentication: jwt,
        },
      )
      .pipe(
        tap((data) => {
          console.log('data', data);
          context.switchToHttp().getRequest().user = data;
        }),
        map((data) => !!data),
        catchError((err) => of(false)),
      );
  }
}
