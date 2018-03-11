import * as React from 'react';
import { match, Route  } from 'react-router';
import pageWithRoutes from '../common/pageWithRoutes';
import UpdateEditor from './updateEditor';
import UsersList from './usersList';

export default pageWithRoutes((m: match<{}>) => [
    <Route key="lis" exact path={`${m.url}`} component={UsersList} />,
    <Route key="edit" exact path={`${m.url}/:id`} component={UpdateEditor} />,
]);
