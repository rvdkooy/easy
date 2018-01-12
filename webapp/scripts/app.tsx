import * as React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Layout from './components/layout/layout';
import LoginPage from './components/login/index';
import bootstrapper from './bootstrapper';
import { CurrentUserProvider } from './services/userProvider';
import { retrieveCurrentUser } from './services/userService';
import ErrorBoundary from './components/common/errorBoundary';

bootstrapper().then((user) => {
    console.log(user);
    if (user) {
        render(
            <BrowserRouter>
                <CurrentUserProvider currentUser={user}>
                    <Switch>
                        <ErrorBoundary>
                            <Route path='/admin' component={Layout} />
                        </ErrorBoundary>
                    </Switch>
                </CurrentUserProvider>
            </BrowserRouter>, document.getElementById('maincontainer')
        );
    } else {
        render(<LoginPage />, document.getElementById('maincontainer'));
    }
});
