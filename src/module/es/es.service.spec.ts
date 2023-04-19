import { Test, TestingModule } from '@nestjs/testing'
import { EsService } from './es.service'

describe('EsService', () => {
  let service: EsService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EsService],
    }).compile()

    service = module.get<EsService>(EsService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
