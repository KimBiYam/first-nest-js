import { PartialType } from '@nestjs/swagger';
import CreateCatDto from './create-cat.dto';

export default class UpdateCatDto extends PartialType(CreateCatDto) {}
