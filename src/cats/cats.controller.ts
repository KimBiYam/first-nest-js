import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CatModels } from './cat.models';
import { CatsService } from './cats.service';
import CreateCatDto from './dto/create-cat.dto';

@ApiTags('cats')
@Controller('cats')
export class CatsController {
  constructor(private readonly catsServcie: CatsService) {}

  @Post()
  create(@Body() createCatDto: CreateCatDto): boolean {
    return this.catsServcie.create(createCatDto);
  }

  @Get('')
  findAll(): CatModels[] {
    return this.catsServcie.findAll();
  }

  @Get('search')
  search(@Query('age', ParseIntPipe) age: number): CatModels[] {
    return this.catsServcie.search(age);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): CatModels {
    return this.catsServcie.findOne(id);
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() CatModels: CatModels) {
    return `This action updates a #${id} cat`;
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.catsServcie.deleteOne(id);
  }
}
