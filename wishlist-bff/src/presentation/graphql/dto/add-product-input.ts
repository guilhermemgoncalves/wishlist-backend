import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class AddProductInput {
  @Field(() => String, {
    description: 'ID of the product to be added',
  })
  @IsString()
  @IsNotEmpty()
  id: string;
}
