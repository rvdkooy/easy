import { IconButton, TableCell, TableRow } from '@material-ui/core';
import { Delete as DeleteIcon } from '@material-ui/icons';
import * as React from 'react';
import { Link } from 'react-router-dom';
import ConfirmModal from '../../components/common/modals/confirmModal';
import ListModel from './models/list';

class TenantsListRow extends React.Component<Props, State> {

    state = {
        confirmDelete: false,
    };

    _onDeleteClicked = () => {
        this.setState({ confirmDelete: true });
    }

    _onHideConfirmDelete = () => {
        this.setState({ confirmDelete: false });
    }

    _onDeleteConfirmed = () => {
        this.props.onDelete(this.props.tenant.id);
    }

    render() {
        const { tenant } = this.props;

        return (
            <TableRow key={tenant.id}>
                <TableCell>{tenant.tenantId}</TableCell>
                <TableCell>
                    <Link to={`/admin/tenants/${tenant.id}`}>{tenant.email}</Link>
                </TableCell>
                <TableCell>
                    <IconButton aria-label="Delete" onClick={this._onDeleteClicked}>
                        <DeleteIcon />
                    </IconButton>
                    <ConfirmModal
                        title="Confirm"
                        show={this.state.confirmDelete}
                        onHide={this._onHideConfirmDelete}
                        onConfirm={this._onDeleteConfirmed}>
                            <span>{ `Are you sure that you want to delete the tenant: ${tenant.email}?`}</span>
                    </ConfirmModal>
                </TableCell>
            </TableRow>
        );
    }
}

interface Props {
    tenant: ListModel;
    onDelete: (id: string) => void;
}

interface State {
    confirmDelete: boolean;
}

export default TenantsListRow;
