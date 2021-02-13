import { Injectable } from '@nestjs/common';
import { CatDto } from './cat.dto';

@Injectable()
export class CatsService {
  private cats: CatDto[] = [];

  findAll(): CatDto[] {
    return this.cats;
  }

  findOne(id: number): CatDto {
    return this.cats.find((cat) => cat.id === id);
  }

  deleteOne(id: number): boolean {
    this.cats = this.cats.filter((cat) => cat.id !== id);
    return true;
  }

  create(catData): boolean {
    this.cats.push({
      id: this.cats.length + 1,
      ...catData,
    });
    return true;
  }

  search(age: number): CatDto[] {
    return this.cats.filter((cat) => cat.age === age);
  }
}
