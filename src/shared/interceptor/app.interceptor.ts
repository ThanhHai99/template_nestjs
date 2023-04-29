import { CallHandler, ExecutionContext, Injectable, NestInterceptor, HttpStatus } from '@nestjs/common'
import { Observable, map } from 'rxjs'

// @Injectable()
// export class AppInterceptor<T> implements NestInterceptor<T, Response<T>> {
//   constructor(private reflector: Reflector) {}

//   intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {
//     const responseMessage = this.reflector.get<string>(ResponseMessageKey, context.getHandler()) ?? ''

//     return next.handle().pipe(
//       map((data) => ({
//         data,
//         statusCode: context.switchToHttp().getResponse().statusCode,
//         message: responseMessage,
//       })),
//     )
//   }
// intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
// const req: Request = context.switchToHttp().getRequest()
// const thisQuery = req.query
// const thisQueryDto = thisQuery as unknown as RequestDto
// validate(thisQueryDto).then((e0) => {
//   if (e0.length > 0) throw new HttpException(e0, HttpStatus.BAD_REQUEST)
// })
// const signReq = thisQueryDto.sign
// delete thisQueryDto.sign
// const signTruth = this.generateSignature('AppSecret', req.url.split('?')[0], thisQueryDto)

// if (signReq !== signTruth) {
//   throw new HttpException('loi cmnr', HttpStatus.BAD_REQUEST)
// }

// context.switchToHttp().getResponse()

// return next.handle()
// }
// }

export interface Response<T> {
  data: string
  message: string
}

const genSalt = (length: number): string => {
  let result = ''
  const characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const charactersLength = characters.length
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }
  return result
}

const encode = (data: string): string => {
  const dataBuff1 = Buffer.from(data).toString('base64')
  const saltStart = genSalt(5)
  const saltEnd = genSalt(7)
  const dataBuff2 = Buffer.from(saltStart + dataBuff1 + saltEnd).toString('base64')
  return dataBuff2
}

@Injectable()
export class AppInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {
    return next.handle().pipe(
      map((data) => ({
        data: encode(String(data)),
        message: 'ok',
      })),
    )
  }
}
