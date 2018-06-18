import Button from 'material-ui/Button';
import { CircularProgress } from 'material-ui/Progress';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Typography from 'material-ui/Typography';
import * as PropTypes from 'prop-types';
import * as React from 'react';
import { Link } from 'react-router-dom';
import { BreadCrumbs, Container, PaddedPaper } from '../common';

import { notify } from '../../services/notificationService';
import ListModel from './models/list';
import { deleteUser, getUsers } from './usersApi';
import UsersListRow from './usersListRow';

class UsersList extends React.Component<undefined, State> {

    state: State = {
        isLoading: false,
        users: [],
    };

    componentDidMount() {
        this._refreshUsers();
    }

    _refreshUsers = () => {
        this.setState({ isLoading: true });
        getUsers().then((users) => {
            this.setState({
                isLoading: false,
                users,
            });
        })
        .catch(() => notify('An error occured while retrieving the list of users', 'ERROR'));
    }

    _onDeleteClicked = (id: string) => {
        deleteUser(id)
            .then(this._refreshUsers)
            .catch(() => notify('An error occured while deleting the user', 'ERROR'));
    }

    render() {
        const breadCrumbItems = [
            { text: 'Users' },
        ];

        const rows = this.state.users.map((user) => {
            return (
                <UsersListRow
                    key={user.id}
                    user={user}
                    onDelete={this._onDeleteClicked}
                />
            );
        });

        return (
            <div>
                <BreadCrumbs items={breadCrumbItems} />
                <PaddedPaper>
                    <Typography type="headline">List of users</Typography>
                    <Container>
                        {
                            (this.state.isLoading) ?
                                <CircularProgress /> :
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Photo</TableCell>
                                            <TableCell>TenantId</TableCell>
                                            <TableCell>Username</TableCell>
                                            <TableCell>Email</TableCell>
                                            <TableCell>Actions</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {rows}
                                    </TableBody>
                                </Table>
                        }

                    </Container>
                </PaddedPaper>
            </div>
        );
    }
}

interface State {
    users: ListModel[];
    isLoading: boolean;
}

export default UsersList;
