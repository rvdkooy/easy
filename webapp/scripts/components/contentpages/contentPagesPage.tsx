import * as React from 'react';
import { Route, match } from 'react-router';
import pageWithRoutes from '../common/pageWithRoutes';
import ContentPagesList from './contentPagesList';
import CreateContentPage from './createContentPage';
import EditContentPage from './editContentPage';

export default pageWithRoutes((match: match<{}>) => [
    <Route key={'list'} exact path={`${match.url}`} component={ContentPagesList} />,
    <Route key={'new'} exact path={`${match.url}/new`} component={CreateContentPage} />,
    <Route key={'edit'} exact path={`${match.url}/:id`} component={EditContentPage} />
]);