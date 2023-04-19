import { Injectable } from '@nestjs/common'
import { EsService } from '../es/es.service'
import { ApiResponse } from '@elastic/elasticsearch'

@Injectable()
export class AppService {
  constructor(private readonly esService: EsService) {}
  public async setData(): Promise<Array<ApiResponse<Record<string, any>, Record<string, unknown>>>> {
    const data = [
      {
        idx: 'idx-0',
        id: 'id1',
        data: {
          d1: 'hihi',
          d2: 'kkk',
        },
      },
      {
        idx: 'idx-0',
        id: 'id2',
        data: {
          d1: 'haha',
          d2: '=))',
        },
      },
    ]

    const res: Array<ApiResponse<Record<string, any>, Record<string, unknown>>> = []
    data.forEach(async (d) => {
      const setRes = await this.esService.esIndex(d.idx, d.id, d.data)
      res.push(setRes)
    })

    return res
  }

  public async getData(idx: string, id: string): Promise<ApiResponse<Record<string, any>, Record<string, unknown>>> {
    return await this.esService.esGet(idx, id)
  }
}
