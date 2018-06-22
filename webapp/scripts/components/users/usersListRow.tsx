import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { TableCell, TableRow } from '@material-ui/core/Table';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete'
import ConfirmModal from '../../components/common/modals/confirmModal';
import ListModel from './models/list';

class UsersListRow extends React.Component<Props, State> {

    state = {
        confirmDelete: false
    }

    _onDeleteClicked = () => {
        this.setState({ confirmDelete: true });
    };

    _onHideConfirmDelete = () => {
        this.setState({ confirmDelete: false });
    };


    _onDeleteConfirmed = () => {
        this.props.onDelete(this.props.user.id);
    };

    render() {
        const { user } = this.props;
        
        return (
            <TableRow key={user.id}>
                <TableCell>
                    <Avatar src={user.photo} />
                </TableCell>
                <TableCell>{user.tenantId}</TableCell>
                <TableCell>
                    <Link to={`/admin/users/${user.id}`}>{user.displayName}</Link>
                </TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                    <IconButton aria-label="Delete" onClick={this._onDeleteClicked}>
                        <DeleteIcon />
                    </IconButton>
                    <ConfirmModal
                        title="Confirm"
                        show={this.state.confirmDelete}
                        onHide={this._onHideConfirmDelete}
                        onConfirm={this._onDeleteConfirmed}>
                            <span>{ `Are you sure that you want to delete the user: ${user.displayName}?`}</span>
                    </ConfirmModal>
                </TableCell>
            </TableRow>
        );
    }
};

interface Props {
    user: ListModel,
    onDelete: (id: string) => void
}

interface State {
    confirmDelete: boolean
}

export default UsersListRow;