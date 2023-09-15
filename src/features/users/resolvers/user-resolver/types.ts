export default interface IUserResolver {
  hello: () => Promise<string>;
}

export const IUserResolverSymbol = Symbol.for('IUserResolver')