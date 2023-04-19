import { ApiResponse } from '@elastic/elasticsearch'
import { Injectable } from '@nestjs/common'
import { ElasticsearchService } from '@nestjs/elasticsearch'

@Injectable()
export class EsService {
  constructor(private readonly elasticsearchService: ElasticsearchService) {}

  public async esSet(idx: string, id: string, data: object): Promise<number> {
    try {
      return await this.elasticsearchService
        .index({
          index: idx,
          id: id,
          body: data,
        })
        .then((data) => {
          return data.statusCode
        })
    } catch (e0) {
      console.log(e0)
    }
  }

  public async esGet(idx: string, id: string): Promise<ApiResponse<Record<string, any>, Record<string, unknown>>> {
    try {
      return await this.elasticsearchService.get({
        index: idx,
        id: id,
      })
    } catch (e0) {
      console.log(e0)
    }
  }
}
