import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AddProductRequest {
  //here we can define more properties if needed, like quantity, etc.
  @ApiProperty({ example: '20', description: 'ID of the product to be added' })
  @IsString()
  @IsNotEmpty()
  id: string;
}
