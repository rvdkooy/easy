import * as React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import bootstrapper from './bootstrapper';
import ErrorBoundary from './components/common/errorBoundary';
import Layout from './components/layout/layout';
import LoginPage from './components/login/index';
import { CurrentUserProvider } from './services/userProvider';

bootstrapper().then((user) => {
    // tslint:disable-next-line
    console.info(user);
    if (user) {
        render(
            <BrowserRouter>
                <CurrentUserProvider currentUser={user}>
                    <Switch>
                        <ErrorBoundary>
                            <Route path="/admin" component={Layout} />
                        </ErrorBoundary>
                    </Switch>
                </CurrentUserProvider>
            </BrowserRouter>, document.getElementById('maincontainer'),
        );
    } else {
        render(<LoginPage />, document.getElementById('maincontainer'));
    }
});
