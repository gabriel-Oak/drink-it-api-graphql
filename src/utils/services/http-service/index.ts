import axios, { Axios } from 'axios';
import createContainer from '../../decorators/container';
import './http-service';

createContainer().bind<Axios>('Axios')
  .toDynamicValue(() => axios.create());
