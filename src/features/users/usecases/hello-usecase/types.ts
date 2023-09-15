export default interface IHelloUsecase {
  execute: () => string;
}

export const IHelloUsecaseSymbol = Symbol.for('IHelloUsecase');
