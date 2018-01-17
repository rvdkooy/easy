import * as React from 'react';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import { Link } from 'react-router-dom';
import { BreadCrumbs, PaddedPaper, Container } from '../common';
import { FileItem, getFiles } from './filesService';
import FilesTable from './filesTable';

class FilesPage extends React.Component<undefined, State> {

    state: State = {
        files: []
    };

    componentDidMount() {
        getFiles().then(files => {
            this.setState({ files: files });
        })
    }

    render() {
        const breadCrumbItems = [
            { text: 'Files' }
        ];

        return (
            <div>
                <BreadCrumbs items={breadCrumbItems} />
                <PaddedPaper>
                    <Typography type="headline">Uploaded files</Typography>
                    <Container>
                        <Button
                            component={({ ...props }) => <Link to="/admin/files/upload" { ...props } />}
                            raised color="primary"
                        >
                            Upload new file
                        </Button>
                    </Container>
                    <FilesTable files={this.state.files}></FilesTable>
                </PaddedPaper>
            </div>);
    }
}

interface State {
    files: FileItem[]
};

export default FilesPage;