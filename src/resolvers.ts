import { NonEmptyArray } from 'type-graphql';
import userResolvers from './features/users';
import cocktailResolvers from './features/cocktail';

const resolvers = [
  ...userResolvers,
  ...cocktailResolvers,
  // eslint-disable-next-line @typescript-eslint/ban-types
] as unknown as NonEmptyArray<Function> | NonEmptyArray<string>;

export default resolvers;
