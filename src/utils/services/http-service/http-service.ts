import { AxiosInstance, AxiosRequestConfig } from 'axios';
import { inject } from 'inversify';
import { IHttpService } from './types';
import Injectable from '../../decorators/injectable';

@Injectable('IHttpService')
export default class HttpService implements IHttpService {
  constructor(
    @inject('Axios') private readonly client: AxiosInstance,
  ) { }

  async get<T>(url: string, config?: AxiosRequestConfig) {
    const { data } = await this.client.get<T>(url, config);
    return data;
  }

  async post<T>(url: string, payload: unknown, config?: AxiosRequestConfig) {
    const { data } = await this.client.post<T>(url, payload, config);
    return data;
  }
}
