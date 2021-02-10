import { IsNumber, IsString } from 'class-validator';

export class CatDto {
  @IsString()
  name: string;

  @IsNumber()
  age: number;

  @IsString()
  breed: string;
}
