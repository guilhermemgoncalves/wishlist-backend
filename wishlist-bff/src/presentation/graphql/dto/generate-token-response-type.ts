import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class GenerateTokenResponseType {
  @Field()
  token: string;
}
