import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { BaseRepository } from '../repository/base.repository'

export function InjectBaseRepository(entity: any) {
  return function (target: any, key: string) {
    InjectRepository(entity)(target, 'repository')
    Object.defineProperty(target, key, {
      get() {
        return new BaseRepository(this.repository)
      },
    })
  }
}
