import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CatDto } from './cat.dto';

@Controller('cats')
export class CatsController {
  @Post()
  create(@Body() catDto: CatDto): string {
    console.log(catDto);
    return 'This action adds a new cat';
  }

  @Get('')
  findAll(): string {
    return 'This action returns all cats';
  }

  @Get(':id')
  findOne(@Param('id') id: string): string {
    return `This action returns a #${id} cat`;
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() catDto: CatDto) {
    return `This action updates a #${id} cat`;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return `This action removes a #${id} cat`;
  }
}
