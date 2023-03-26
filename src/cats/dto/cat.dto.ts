import { PickType } from '@nestjs/swagger';
import { ApiProperty } from '@nestjs/swagger/dist/decorators';
import { Cat } from '../cats.schema';

export class ReadOnlyCatDto extends PickType(Cat, ['email', 'name'] as const) {
  @ApiProperty({
    example: '3280199',
    description: 'id',
    required: true,
  })
  id: string;
}
