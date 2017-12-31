import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { TableCell, TableRow } from 'material-ui/Table';
import IconButton from 'material-ui/IconButton';
import DeleteIcon from 'material-ui-icons/Delete'
import ConfirmModal from '../../components/common/modals/confirmModal';
import ListModel from './models/list';

class ContentPagesListRow extends React.Component<Props, State> {

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
        this.props.onDelete(this.props.item.id);
    };

    render() {
        const { item } = this.props;
        
        return (
            <TableRow key={item.id}>
                <TableCell>
                    <Link to={`/admin/contentpages/${item.id}`}>{item.name}</Link>
                </TableCell>
                <TableCell>{item.url}</TableCell>
                <TableCell></TableCell>
                <TableCell>
                    <IconButton aria-label="Delete" onClick={this._onDeleteClicked}>
                        <DeleteIcon />
                    </IconButton>
                    <ConfirmModal
                        title="Confirm"
                        show={this.state.confirmDelete}
                        onHide={this._onHideConfirmDelete}
                        onConfirm={this._onDeleteConfirmed}>
                            <span>{ `Are you sure that you want to delete the content page: ${item.name}?`}</span>
                    </ConfirmModal>
                </TableCell>
            </TableRow>
        );
    }
};

interface Props {
    item: ListModel,
    onDelete: (id: string) => void
}

interface State {
    confirmDelete: boolean
}

export default ContentPagesListRow;