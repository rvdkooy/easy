import * as React from 'react';
import { Route, match } from 'react-router';
import pageWithRoutes from '../common/pageWithRoutes';
import List from './list';
import Create from './create';
import Edit from './edit';

export default pageWithRoutes((match: match<{}>) => [
    <Route key="list" exact path={`${match.url}`} component={List} />,
    <Route key="new" exact path={`${match.url}/new`} component={Create} />,
    <Route key="edit" exact path={`${match.url}/:id`} component={Edit} />
]);