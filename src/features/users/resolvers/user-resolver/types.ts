export default interface IUserResolver {
  hello: () => Promise<string>;
}