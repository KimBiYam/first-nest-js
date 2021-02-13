import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { CatsService } from './cats.service';
import UpdateCatDto from './dto/update-cat.dto';

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

  describe('findAll', () => {
    it('should return an array', () => {
      const result = service.findAll();
      expect(result).toBeInstanceOf(Array);
    });
  });

  describe('findOne', () => {
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

    it('should throw a NotFoundException', () => {
      const id = 999;
      try {
        service.findOne(id);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toEqual(`Cat with Id ${id} not found.`);
      }
    });
  });

  describe('deleteOne', () => {
    it('deletes a cat', () => {
      service.create({
        age: 12,
        breed: 'Test',
        favoriteThings: ['test'],
        name: 'test',
      });
      const countOfBeforeDelete = service.findAll().length;
      service.deleteOne(countOfBeforeDelete);
      const countOfAfterDelete = service.findAll().length;
      expect(countOfAfterDelete).toBeLessThan(countOfBeforeDelete);
    });
    it('shoud throw NotFoundException', () => {
      try {
        service.deleteOne(999);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('create', () => {
    it('should create a cat', () => {
      const countOfBeforeCreate = service.findAll().length;
      service.create({
        age: 12,
        breed: 'Test',
        favoriteThings: ['test'],
        name: 'test',
      });
      const countOfAfterCreate = service.findAll().length;
      expect(countOfAfterCreate).toBeGreaterThan(countOfBeforeCreate);
    });
  });

  describe('update', () => {
    it('should update a cat', () => {
      service.create({
        age: 12,
        breed: 'Test',
        favoriteThings: ['test'],
        name: 'test',
      });
      const name = 'Updated Test';
      service.update(1, { name });
      const cat = service.findOne(1);
      expect(cat.name).toEqual(name);
    });
    it('shoud throw a NotFoundException', () => {
      try {
        service.update(999, {});
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('search', () => {
    it('should search a cat by age', () => {
      service.create({
        age: 12,
        breed: 'Test',
        favoriteThings: ['test'],
        name: 'test',
      });
      const age = 12;
      const cats = service.search(age);
      expect(cats.length).toBeGreaterThan(0);
    });
  });
});
