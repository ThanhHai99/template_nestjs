import { ApiResponse } from '@elastic/elasticsearch'
import { Injectable } from '@nestjs/common'
import { ElasticsearchService } from '@nestjs/elasticsearch'

@Injectable()
export class EsService {
  constructor(private readonly elasticsearchService: ElasticsearchService) {}

  public async esIndex(idx: string, id: string, data: object): Promise<ApiResponse<Record<string, any>, Record<string, unknown>>> {
    return await this.elasticsearchService.index({
      index: idx,
      id: id,
      body: data,
    })
  }

  public async esGet(idx: string, id: string): Promise<ApiResponse<Record<string, any>, Record<string, unknown>>> {
    return await this.elasticsearchService.get({
      index: idx,
      id: id,
    })
  }
}
