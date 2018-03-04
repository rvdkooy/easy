import * as React from 'react';
import { Route, match } from 'react-router';
import pageWithRoutes from '../common/pageWithRoutes';

export default pageWithRoutes((match: match<{}>) => [
    <Route exact path={`${match.url}`} component={null} />,
    <Route exact path={`${match.url}/new`} component={null} />,
    <Route exact path={`${match.url}/:id`} component={null} />
]);