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
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CatDto } from './cat.dto';
import { CatsService } from './cats.service';

@ApiTags('cats')
@ApiResponse({ status: 200, description: '성공' })
@Controller('cats')
export class CatsController {
  constructor(private readonly catsServcie: CatsService) {}

  @Post()
  create(@Body() catData): boolean {
    return this.catsServcie.create(catData);
  }

  @Get('')
  findAll(): CatDto[] {
    return this.catsServcie.findAll();
  }

  @Get('search')
  search(@Query('age', ParseIntPipe) age: number): CatDto[] {
    return this.catsServcie.search(age);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): CatDto {
    return this.catsServcie.findOne(id);
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() catDto: CatDto) {
    return `This action updates a #${id} cat`;
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.catsServcie.deleteOne(id);
  }
}
