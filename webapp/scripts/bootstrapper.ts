import { retrieveCurrentUser, User } from './services/userService';

export default (): Promise<User> => {
    return retrieveCurrentUser();
};
