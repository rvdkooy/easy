import * as React from 'react';
import { match } from 'react-router-dom';
import { Switch, Route } from 'react-router';
import UsersList from './usersList';
import UpdateEditor from './updateEditor';

class UsersPage extends React.Component<Props> {
    render() {
        const { match } = this.props;
        
        return (
            <Switch>
                <Route exact path={`${match.url}`} component={UsersList} />
                <Route exact path={`${match.url}/:id`} component={UpdateEditor} />
            </Switch>
        );
    }
}

interface Props {
    match: match<{ }>
}

export default UsersPage;