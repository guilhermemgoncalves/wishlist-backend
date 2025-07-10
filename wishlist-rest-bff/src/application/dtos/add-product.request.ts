import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AddProductRequest {
  @ApiProperty({ example: '123', description: 'ID of the product to be added' })
  @IsString()
  @IsNotEmpty()
  id: string;
}
