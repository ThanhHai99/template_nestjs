import { Test, TestingModule } from '@nestjs/testing'
import { Encode2Service } from './encode2.service'

describe('Encode2Service', () => {
  let service: Encode2Service

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Encode2Service],
    }).compile()

    service = module.get<Encode2Service>(Encode2Service)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
