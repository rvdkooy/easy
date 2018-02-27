import * as React from 'react';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import { Link } from 'react-router-dom';
import { BreadCrumbs, PaddedPaper, Container } from '../common';
import { FileItem, getFiles, deleteFile } from './filesService';
import FilesTable from './filesTable';
import UploadFileDialog from './uploadFileDialog';
import { notify } from '../../services/notificationService';
import { withUser, UserProps } from '../../services/userProvider';

class FilesPage extends React.Component<UserProps, State> {

    state: State = {
        files: [],
        showUploadDialog: false
    };

    componentDidMount() {
        this._refreshFilesTable();
    }

    _refreshFilesTable = () => {
        getFiles(this.props.currentUser.tenantId)
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

    _onDeleteFile = (key: string) => {
        deleteFile(this.props.currentUser.tenantId, key)
            .then(() => {
                notify(`File: '${key} was deleted successfully'`, "INFO");
                this._refreshFilesTable();
            })
            .catch(() => notify('An error occured while deleting your file', 'ERROR'));
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
                            onClick={this._onNewFileUploadClicked}
                            raised color="primary"
                        >
                            Upload new file
                        </Button>
                    </Container>
                    <FilesTable 
                        files={this.state.files}
                        onDeleteFile={this._onDeleteFile}
                    />
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

export default withUser<{}>(FilesPage);