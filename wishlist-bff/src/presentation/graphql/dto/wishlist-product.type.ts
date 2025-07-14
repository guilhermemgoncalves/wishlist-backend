import { ObjectType, Field, ID, Float } from '@nestjs/graphql';

@ObjectType()
export class WishlistProductType {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field(() => Float)
  price: number;

  @Field()
  category: string;

  @Field(() => Date)
  addAt: Date;
}
