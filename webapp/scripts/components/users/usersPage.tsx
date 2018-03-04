import * as React from 'react';
import { Route, match } from 'react-router';
import pageWithRoutes from '../common/pageWithRoutes';
import UsersList from './usersList';
import UpdateEditor from './updateEditor';

export default pageWithRoutes((match: match<{}>) => [
    <Route key='list' exact path={`${match.url}`} component={UsersList} />,
    <Route key='edit' exact path={`${match.url}/:id`} component={UpdateEditor} />
]);