import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CatModels } from './cat.models';
import { CatsService } from './cats.service';
import CreateCatDto from './dto/create-cat.dto';
import UpdateCatDto from './dto/update-cat.dto';

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

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCatDto: UpdateCatDto,
  ) {
    return this.catsServcie.updateOne(id, updateCatDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.catsServcie.deleteOne(id);
  }
}
