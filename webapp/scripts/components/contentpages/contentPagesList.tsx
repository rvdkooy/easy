import * as React from 'react';
import * as PropTypes from 'prop-types';
import { CircularProgress } from 'material-ui/Progress';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import Paper from 'material-ui/Paper';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import { Link } from 'react-router-dom';
import { Container, BreadCrumbs } from '../common';

import ListRow from './contentPagesListRow';
import { getContentPages } from './contentPagesApi'
import ListModel from './models/list';

class ContentPagesList extends React.Component<Props, State> {
    
    state: State = {
        isLoading: false,
        contentPages: []
    };

    componentDidMount() {
        this._refreshUsers();
    }

    _refreshUsers = () => {
        this.setState({ isLoading: true });
        getContentPages().then(contentPages => {
            this.setState({
                isLoading: false,
                contentPages: contentPages
            });
        })
        .catch(console.error);
    };

    _onDeleteClicked = (id: string) => {
        // deleteUser(id)
        //     .then(this._refreshUsers)
        //     .catch(console.error)
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

        return (<div>
                    <BreadCrumbs items={breadCrumbItems} />
                    <Typography type="headline">ContentPages</Typography>
                    <Container>
                        <Button 
                            component={({ ...props }) => <Link to="/admin/contentpages/new" { ...props } />}
                            raised color="primary"
                        >
                            Create new page
                        </Button>
                    </Container>
                    <Container>
                        <Paper>
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
                        </Paper>
                    </Container>
                </div>);
	}
}

interface Props {

}

interface State {
    contentPages: ListModel[],
    isLoading: boolean
}

export default ContentPagesList;