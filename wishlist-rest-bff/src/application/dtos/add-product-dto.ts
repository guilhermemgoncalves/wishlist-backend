import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AddProductDto {
  @ApiProperty({ example: '123', description: 'ID of the product to be added' })
  @IsString()
  @IsNotEmpty()
  productId: string;
}
