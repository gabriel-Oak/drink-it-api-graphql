/* eslint-disable max-classes-per-file */
export class Left<E> {
  readonly isError = true;

  readonly isSuccess = false;

  public error!: E;

  constructor(error: E) {
    this.error = error;
  }
}

export class Right<R> {
  readonly isError = false;

  readonly isSuccess = true;

  public success!: R;

  constructor(success: R) {
    this.success = success;
  }
}

export type Either<E, R> = Left<E> | Right<R>;
