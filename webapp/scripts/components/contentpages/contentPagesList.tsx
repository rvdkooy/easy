import * as React from 'react';
import * as PropTypes from 'prop-types';
import { CircularProgress } from 'material-ui/Progress';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import PaddedPaper from '../common/paddedPaper';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import { Link } from 'react-router-dom';
import { Container, BreadCrumbs } from '../common';

import ListRow from './contentPagesListRow';
import { getContentPages, deleteContentPage } from './contentPagesApi'
import ListModel from './models/list';
import { notify } from '../../services/notificationService';
import { withUser, UserProps } from '../../services/userProvider';

class ContentPagesList extends React.Component<Props, State> {

    state: State = {
        isLoading: false,
        contentPages: []
    };

    componentDidMount() {
        this._refreshList();
    }

    _refreshList = () => {
        this.setState({ isLoading: true });
        getContentPages(this.props.currentUser.tenantId).then(contentPages => {
            this.setState({
                isLoading: false,
                contentPages: contentPages
            });
        })
        .catch(() => notify('An error occured while getting the content pages', 'ERROR'));
    };

    _onDeleteClicked = (id: string) => {
        deleteContentPage(this.props.currentUser.tenantId, id)
            .then(() => {
                notify('Content page deleted', 'INFO');
                this._refreshList();
            })
            .catch(() => notify('An error occured while deleting the content page', 'ERROR'));
    };

    render() {
        const breadCrumbItems = [
            { text: 'Content Pages' }
        ];

        var rows = this.state.contentPages.map(p => {
            return (
                <ListRow
                    key={p.id}
                    item={p}
                    onDelete={this._onDeleteClicked}
                />
            );
        })

        return (
            <div>
                <BreadCrumbs items={breadCrumbItems} />

                <PaddedPaper>
                    <Typography type="headline">List of content pages</Typography>
                    <Container>
                        <Button
                            component={({ ...props }) => <Link to="/admin/contentpages/new" { ...props } />}
                            raised color="primary"
                        >
                            Create a new page
                        </Button>
                    </Container>
                    {
                        (this.state.isLoading) ?
                            <CircularProgress /> :
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Name</TableCell>
                                        <TableCell>Url</TableCell>
                                        <TableCell>Published</TableCell>
                                        <TableCell>Actions</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {rows}
                                </TableBody>
                            </Table>
                    }
                </PaddedPaper>
            </div>
        );
    }
}

interface Props extends UserProps {

}

interface State {
    contentPages: ListModel[],
    isLoading: boolean
}

export default withUser<{}>(ContentPagesList);