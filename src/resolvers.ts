import { NonEmptyArray } from 'type-graphql';
import userResolvers from './features/users';

const resolvers = [
  ...userResolvers,
] as unknown as NonEmptyArray<Function> | NonEmptyArray<string>;

export default resolvers;