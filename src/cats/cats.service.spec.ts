import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { CatsService } from './cats.service';

describe('CatsService', () => {
  let service: CatsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CatsService],
    }).compile();

    service = module.get<CatsService>(CatsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll()', () => {
    it('should return an array', () => {
      const result = service.findAll();
      expect(result).toBeInstanceOf(Array);
    });
  });

  describe('findOne()', () => {
    it('should find a cat', () => {
      service.create({
        age: 12,
        breed: 'Test',
        favoriteThings: ['test'],
        name: 'test',
      });

      const cat = service.findOne(1);
      expect(cat).toBeDefined();
      expect(cat.id).toEqual(1);
      expect(cat.name).toEqual('test');
    });

    it('should throw not found exception', () => {
      const id = 999;
      try {
        service.findOne(id);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toEqual(`Cat with Id ${id} not found.`);
      }
    });
  });
});
