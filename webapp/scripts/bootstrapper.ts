import { retrieveCurrentUser, User } from './services/userApi';

export default (): Promise<User> => {
    return retrieveCurrentUser();
};
