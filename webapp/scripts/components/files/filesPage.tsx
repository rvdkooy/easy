import * as React from 'react';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import { Link } from 'react-router-dom';
import { BreadCrumbs, PaddedPaper, Container } from '../common';
import { FileItem, getFiles } from './filesService';
import FilesTable from './filesTable';
import UploadFileDialog from './uploadFileDialog';
import { notify } from '../../services/notificationService';

class FilesPage extends React.Component<undefined, State> {

    state: State = {
        files: [],
        showUploadDialog: false
    };

    componentDidMount() {
        this._refreshFilesTable();
    }

    _refreshFilesTable = () => {
        getFiles()
            .then(files => {
                this.setState({ files: files });
            })
            .catch(() => {
                notify('An error occured while retrieving the list of files', 'ERROR');
            });;
    };

    _onNewFileUploadClicked = () => {
        this.setState({ showUploadDialog: true });
    };

    _onCloseUploadDialog = (refresh?: boolean) => { 
        this.setState({ showUploadDialog: false });

        if (refresh) {
            this._refreshFilesTable();
        }
    };

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
                            onClick={this._onNewFileUploadClicked}
                            raised color="primary"
                        >
                            Upload new file
                        </Button>
                    </Container>
                    <FilesTable files={this.state.files}></FilesTable>
                </PaddedPaper>
                <UploadFileDialog
                    open={ this.state.showUploadDialog }
                    onClose={ this._onCloseUploadDialog }
                />
            </div>);
    }
}

interface State {
    files: FileItem[],
    showUploadDialog: boolean
};

export default FilesPage;