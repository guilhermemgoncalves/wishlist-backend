import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class GenerateTokenInput {
  @Field(() => Int)
  userId: number;
}
