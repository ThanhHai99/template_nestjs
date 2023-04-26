import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common'
import { Observable } from 'rxjs'

@Injectable()
export class AppInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req: Request = context.switchToHttp().getRequest()
    const res: Response = context.switchToHttp().getResponse()
    console.log('Before...')
    console.log(JSON.stringify(res.))

    return next.handle()
    // const now = Date.now()
    // // return next.handle().pipes(tap(() => console.log(`After... ${Date.now() - now}ms`)))
    // return next.handle().pipe(tap(() => console.log(`After ... ${Date.now() - now} ms`)))
  }
}
