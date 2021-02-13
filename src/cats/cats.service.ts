import { Injectable, NotFoundException } from '@nestjs/common';
import { CatModels } from './cat.models';
import CreateCatDto from './dto/create-cat.dto';
import UpdateCatDto from './dto/update-cat.dto';

@Injectable()
export class CatsService {
  private cats: CatModels[] = [];

  findAll(): CatModels[] {
    return this.cats;
  }

  findOne(id: number): CatModels {
    const cat = this.cats.find((cat) => cat.id === id);
    if (cat === undefined) {
      throw new NotFoundException(`Cat with Id ${id} not found.`);
    }
    return cat;
  }

  deleteOne(id: number) {
    this.findOne(id);
    this.cats = this.cats.filter((cat) => cat.id !== id);
  }

  create(createCatDto: CreateCatDto): boolean {
    this.cats.push({
      id: this.cats.length + 1,
      ...createCatDto,
    });
    return true;
  }

  update(id: number, updateCatDto: UpdateCatDto): boolean {
    const cat = this.findOne(id);
    this.deleteOne(id);
    this.cats.push({ ...cat, ...updateCatDto });
    return true;
  }

  search(age: number): CatModels[] {
    return this.cats.filter((cat) => cat.age === age);
  }
}
