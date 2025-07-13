import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class RemoveProductResponseType {
  @Field()
  removed: boolean;

  @Field({ nullable: true })
  message?: string;
}
