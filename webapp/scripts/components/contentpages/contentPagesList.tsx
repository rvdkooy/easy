import { Button, CircularProgress, Table, TableBody, TableCell,
    TableHead, TableRow, Typography } from '@material-ui/core';
import * as React from 'react';
import { Link } from 'react-router-dom';
import { notify } from '../../services/notificationService';
import { withTenant, WithTenantProps } from '../../services/withTenant';
import { BreadCrumbs, Container } from '../common';
import PaddedPaper from '../common/paddedPaper';
import { deleteContentPage, getContentPages } from './contentPagesApi';
import ListRow from './contentPagesListRow';
import ListModel from './models/list';

class ContentPagesList extends React.Component<WithTenantProps, State> {

    state: State = {
        isLoading: false,
        contentPages: [],
    };

    componentDidMount() {
        this._refreshList(this.props.selectedTenant.tenantId);
    }

    componentWillReceiveProps(nextProps: WithTenantProps) {
        if (this.props.selectedTenant !== nextProps.selectedTenant) {
            this._refreshList(nextProps.selectedTenant.tenantId);
        }
    }

    _refreshList = (tenantId: string) => {
        this.setState({ isLoading: true });
        getContentPages(tenantId).then((contentPages) => {
            this.setState({
                isLoading: false,
                contentPages,
            });
        })
        .catch(() => notify('An error occured while getting the content pages', 'ERROR'));
    }

    _onDeleteClicked = (id: string) => {
        deleteContentPage(this.props.selectedTenant.tenantId, id)
            .then(() => {
                notify('Content page deleted', 'INFO');
                this._refreshList(this.props.selectedTenant.tenantId);
            })
            .catch(() => notify('An error occured while deleting the content page', 'ERROR'));
    }

    render() {
        const breadCrumbItems = [
            { text: 'Content Pages' },
        ];

        const rows = this.state.contentPages.map((p) => {
            return (
                <ListRow
                    key={p.id}
                    item={p}
                    onDelete={this._onDeleteClicked}
                />
            );
        });

        const ButtonComponent = (props: any) => {
            return (<Link to="/admin/contentpages/new" { ...props } />);
        };

        return (
            <div>
                <BreadCrumbs
                    items={breadCrumbItems}
                    rootItemText={this.props.selectedTenant.site}
                />
                <PaddedPaper>
                    <Typography variant="headline">List of content pages</Typography>
                    <Container>
                        <Button
                            component={ButtonComponent}
                            variant="raised" color="primary"
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

interface State {
    contentPages: ListModel[];
    isLoading: boolean;
}

export default withTenant<{}>(ContentPagesList);
