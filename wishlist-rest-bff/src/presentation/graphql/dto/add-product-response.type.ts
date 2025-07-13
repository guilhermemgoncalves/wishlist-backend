import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class AddProductResponseType {
  @Field(() => Boolean, {
    description: 'Indicates if the product was added successfully.',
  })
  added: boolean;

  @Field(() => String, {
    description: 'Descriptive message of the operation result.',
  })
  message: string;
}
