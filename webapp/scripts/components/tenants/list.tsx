import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { CircularProgress } from '@material-ui/core/Progress';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Table, { TableBody, TableCell, TableHead, TableRow } from '@material-ui/core/Table';
import { Container, BreadCrumbs, PaddedPaper } from '../common';
import { notify } from '../../services/notificationService';
import ListRow from './listRow';
import { getTenants, deleteTenant } from './api'
import ListModel from './models/list';

class TenantsList extends React.Component<undefined, State> {

    state: State = {
        isLoading: false,
        tenants: []
    };

    componentDidMount() {
        this._refreshTenants();
    }

    _refreshTenants = () => {
        this.setState({ isLoading: true });
        getTenants().then(tenants => {
            this.setState({
                isLoading: false,
                tenants: tenants
            });
        })
        .catch(() => notify('An error occured while retrieving the list of tenants', 'ERROR'));
    };

    _onDeleteClicked = (id: string) => {
        deleteTenant(id)
            .then(this._refreshTenants)
            .catch(() => notify('An error occured while deleting the tenant', 'ERROR'))
    };

    render() {
        const breadCrumbItems = [
            { text: 'Tenants' }
        ];

        var rows = this.state.tenants.map(t => {
            return (
                <ListRow
                    key={t.id}
                    tenant={t}
                    onDelete={this._onDeleteClicked}
                />
            );
        })

        return (
            <div>
                <BreadCrumbs items={breadCrumbItems} />
                <PaddedPaper>
                    <Typography type="headline">List of tenants</Typography>
                    <Container>
                        <Button
                            component={({ ...props }) => <Link to="/admin/tenants/new" { ...props } />}
                            raised color="primary"
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
    tenants: ListModel[],
    isLoading: boolean
}

export default TenantsList;