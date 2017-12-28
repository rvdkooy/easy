import * as React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Layout from './components/layout/layout';
import LoginPage from './components/login/index';
import bootstrapper from './bootstrapper';
import { CurrentUserProvider } from './services/userProvider';
import { retrieveCurrentUser } from './services/userService';

bootstrapper().then((user) => {
    console.log(user);
    if (user) {
        render(
            <BrowserRouter>
                <CurrentUserProvider currentUser={user}>
                    <Switch>
                        <Route path='/admin' component={Layout} />
                    </Switch>
                </CurrentUserProvider>
            </BrowserRouter>, document.getElementById('maincontainer')
        );
    } else {
        render(<LoginPage />, document.getElementById('maincontainer'));
    }
});
