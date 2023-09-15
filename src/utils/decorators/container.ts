import { Container } from 'inversify';

let container = new Container();
const createContainer = () => {
  if (!container) container = new Container();
  return container;
};
export default createContainer;
