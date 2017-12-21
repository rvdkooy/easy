import * as React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Layout from './components/layout/layout';
import bootstrapper from './bootstrapper';
import { CurrentUserProvider } from './services/userProvider';
import { retrieveCurrentUser } from './services/userService';

bootstrapper().then((user) => {
    render(
        <BrowserRouter>
            <CurrentUserProvider currentUser={user}>
                <Switch>
                    <Route path='/' component={Layout} />
                </Switch>
            </CurrentUserProvider>
        </BrowserRouter>, document.getElementById('maincontainer')
    );
});
