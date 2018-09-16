import { Button, CircularProgress, Table, TableBody, TableCell, TableHead,
    TableRow, Typography } from '@material-ui/core';
import * as React from 'react';
import { Link } from 'react-router-dom';
import { notify } from '../../services/notificationService';
import { withTenant, WithTenantProps } from '../../services/withTenant';
import { BreadCrumbs, Container, PaddedPaper } from '../common';
import { deleteTenant, getTenants } from './api';
import ListRow from './listRow';
import ListModel from './models/list';

class TenantsList extends React.Component<WithTenantProps, State> {

    state: State = {
        isLoading: false,
        tenants: [],
    };

    componentDidMount() {
        this._refreshTenants();
    }

    _refreshTenants = () => {
        this.setState({ isLoading: true });
        getTenants().then((tenants) => {
            this.setState({
                isLoading: false,
                tenants,
            });
        })
        .catch(() => notify('An error occured while retrieving the list of tenants', 'ERROR'));
    }

    _onDeleteClicked = (id: string) => {
        deleteTenant(id)
            .then(this._refreshTenants)
            .catch(() => notify('An error occured while deleting the tenant', 'ERROR'));
    }

    render() {
        const breadCrumbItems = [
            { text: 'Tenants' },
        ];

        const rows = this.state.tenants.map((t) => {
            return (
                <ListRow
                    key={t.id}
                    tenant={t}
                    onDelete={this._onDeleteClicked}
                />
            );
        });

        const ButtonComponent = ({ ...props }) => <Link to="/admin/tenants/new" { ...props } />;

        return (
            <div>
                <BreadCrumbs
                    rootItemText={this.props.selectedTenant.site}
                    items={breadCrumbItems}
                />
                <PaddedPaper>
                    <Typography variant="headline">List of tenants</Typography>
                    <Container>
                        <Button
                            component={ButtonComponent}
                            color="primary"
                        >
                            Create a new tenant
                        </Button>
                    </Container>
                    <Container>
                        {
                            (this.state.isLoading) ?
                                <CircularProgress /> :
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Id</TableCell>
                                            <TableCell>email</TableCell>
                                            <TableCell></TableCell>
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
    tenants: ListModel[];
    isLoading: boolean;
}

export default withTenant(TenantsList);
