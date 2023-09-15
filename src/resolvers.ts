import { NonEmptyArray } from 'type-graphql';
import userResolvers from './features/users';

const resolvers = [
  ...userResolvers,
// eslint-disable-next-line @typescript-eslint/ban-types
] as unknown as NonEmptyArray<Function> | NonEmptyArray<string>;

export default resolvers;
