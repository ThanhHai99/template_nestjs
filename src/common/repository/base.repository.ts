import { DeepPartial, DeleteResult, FindManyOptions, FindOneOptions, FindOptionsWhere, Repository } from 'typeorm'

export interface IPaginationOptions {
  page: number
  limit: number
}

export interface IPaginationResult<T> {
  items: T[]
  total: number
  page: number
  limit: number
  totalPages: number
}

export class BaseRepository<T> {
  constructor(private readonly repository: Repository<T>) {}

  async find(options?: FindManyOptions<T[]>): Promise<T[]> {
    const qb = this.repository.createQueryBuilder('entity')

    if (options?.where) {
      const whereConditions = options.where
      // Xử lý khi `where` là mảng OR
      if (Array.isArray(whereConditions)) {
        const fullTextConditions = whereConditions.map((condition) => {
          // Ép kiểu và kiểm tra if LIKE
          const entries = Object.entries(condition) as [string, { operator?: string; value?: string }][]
          const likeEntry = entries.find(([_, value]) => value?.operator === 'Like' && typeof value.value === 'string')

          if (likeEntry) {
            const [field, value] = likeEntry
            const keyword = value.value.replace(/%/g, '') // Bỏ dấu `%` trong LIKE
            return `MATCH(${field}) AGAINST('+${keyword}*' IN BOOLEAN MODE)`
          }

          return condition // Giữ nguyên điều kiện nếu không có LIKE
        })

        // Thêm vào truy vấn với OR
        qb.where(fullTextConditions.map((cond) => (typeof cond === 'string' ? cond : JSON.stringify(cond))).join(' OR '))
      } else {
        // Xử lý when điều kiện where là một object
        Object.entries(whereConditions).forEach(([field, value]) => {
          if ((value as any)?.operator === 'Like' && typeof (value as any).value === 'string') {
            const keyword = (value as any).value.replace(/%/g, '') // Xử lý keyword từ Like
            qb.andWhere(`MATCH(${field}) AGAINST(:keyword IN BOOLEAN MODE)`, { keyword: `+${keyword}*` })
          } else {
            qb.andWhere(`${field} = :value`, { value })
          }
        })
      }
    }

    // Cache query
    return await qb.cache(true).getMany()
  }

  async findOne(options: FindOneOptions<T>): Promise<T> {
    return await this.repository.createQueryBuilder().select().where(options.where).cache(true).getOne()
  }

  async findById(id: string): Promise<T> {
    return await this.repository.createQueryBuilder().select().where('id = :id', { id }).cache(true).getOne()
  }

  async save(data: DeepPartial<T>): Promise<T> {
    return await this.repository.save(data as DeepPartial<T>)
  }

  async saveMany(data: DeepPartial<T>[]): Promise<T[]> {
    return await this.repository.save(data as DeepPartial<T>[])
  }

  async delete(id: string): Promise<DeleteResult> {
    return await this.repository.delete(id)
  }

  async softDelete(id: string): Promise<DeleteResult> {
    return await this.repository.softDelete(id)
  }

  async restore(id: string): Promise<DeleteResult> {
    return await this.repository.restore(id)
  }

  async paginate(options: IPaginationOptions): Promise<IPaginationResult<T>> {
    const [items, total] = await this.repository.findAndCount({
      skip: (options.page - 1) * options.limit,
      take: options.limit,
      cache: true,
    })

    const totalPages = Math.ceil(total / options.limit)

    return {
      items,
      total,
      page: options.page,
      limit: options.limit,
      totalPages,
    }
  }

  async count(options?: FindOptionsWhere<T>): Promise<number> {
    return await this.repository.count({ where: options })
  }

  async exists(options: FindOptionsWhere<T>): Promise<boolean> {
    const count = await this.repository.count({ where: options })
    return count > 0
  }

  async update(id: string, data: DeepPartial<T>): Promise<T> {
    await this.repository.update(id, data as any)
    return await this.findById(id)
  }

  async createQueryBuilder(alias?: string) {
    return this.repository.createQueryBuilder(alias)
  }

  async transaction<R>(operation: (entityManager: any) => Promise<R>): Promise<R> {
    return await this.repository.manager.transaction(operation)
  }
}
