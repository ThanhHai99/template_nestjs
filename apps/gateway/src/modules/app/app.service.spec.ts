import { Test } from '@nestjs/testing';

import { AppService } from './app.service';

describe('AppService', () => {
  let service: AppService;

  beforeAll(async () => {
    const app = await Test.createTestingModule({
      providers: [AppService],
    }).compile();

    service = app.get<AppService>(AppService);
  });

  describe('test', () => {
    it('should return "Welcome to gateway!"', () => {
      expect(service.test()).toEqual({ message: 'Welcome to gateway!' });
    });
  });
});
