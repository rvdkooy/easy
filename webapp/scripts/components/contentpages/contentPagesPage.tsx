import * as React from 'react';
import { match, Route } from 'react-router';
import pageWithRoutes from '../common/pageWithRoutes';
import ContentPagesList from './contentPagesList';
import CreateContentPage from './createContentPage';
import EditContentPage from './editContentPage';

export default pageWithRoutes((m: match<{}>) => [
    <Route key={'list'} exact path={`${m.url}`} component={ContentPagesList} />,
    <Route key={'new'} exact path={`${m.url}/new`} component={CreateContentPage} />,
    <Route key={'edit'} exact path={`${m.url}/:id`} component={EditContentPage} />,
]);
