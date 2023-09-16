import { Field, ObjectType } from 'type-graphql';
import BaseError from './base-error';

@ObjectType()
export default class HttpError extends BaseError {
  readonly type = 'http-error';

  @Field()
  public statusCode: number;

  @Field()
  public message!: string;

  constructor(props?: {
    message?: string;
    statusCode?: number;
    meta?: unknown;
  }) {
    const { message, statusCode, meta } = props ?? {};
    const defaultMessage = 'Tivemos algum problema desconhecido';
    const defaultStatusCode = 500;

    super(
      message ?? defaultMessage,
      process.env.NODE_ENV !== 'production' ? meta : undefined,
    );
    this.statusCode = statusCode ?? defaultStatusCode;
  }

  toString = () => `${this.statusCode}: ${this.message}${this.meta
    ? ` | \n${JSON.stringify(this.meta)}`
    : ''}`;
}
