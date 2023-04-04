import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common'
import { Request, Response } from 'express'
import { Observable, tap } from 'rxjs'

@Injectable()
export class TestInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req: Request = context.switchToHttp().getRequest()
    const res: Response = context.switchToHttp().getResponse()
    console.log('Before...')

    const now = Date.now()
    // return next.handle().pipes(tap(() => console.log(`After... ${Date.now() - now}ms`)))
    return next.handle().pipe(tap(() => console.log(`After ... ${Date.now() - now} ms`)))
  }
}
