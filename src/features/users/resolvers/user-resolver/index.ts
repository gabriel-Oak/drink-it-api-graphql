import IUserResolver from './types';
import UserResolver from './user-resolver';

const createUserResolver = () => UserResolver;

export default createUserResolver;