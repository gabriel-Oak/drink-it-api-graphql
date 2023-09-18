import axios, { AxiosInstance } from 'axios';
import createContainer from '../../decorators/container';
import './http-service';

createContainer().bind<AxiosInstance>('Axios')
  .toDynamicValue(() => axios.create());
