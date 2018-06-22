import * as React from 'react';
import { match, Route } from 'react-router';
import pageWithRoutes from '../common/pageWithRoutes';
import Create from './create';
import Edit from './edit';
import List from './list';

export default pageWithRoutes((match: match<{}>) => [
    <Route key="list" exact path={`${match.url}`} component={List} />,
    <Route key="new" exact path={`${match.url}/new`} component={Create} />,
    <Route key="edit" exact path={`${match.url}/:id`} component={Edit} />,
]);
