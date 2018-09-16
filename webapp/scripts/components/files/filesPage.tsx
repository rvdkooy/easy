import { Button, Typography } from '@material-ui/core';
import * as React from 'react';
import { notify } from '../../services/notificationService';
import { UserProps, withUser } from '../../services/userProvider';
import { withTenant, WithTenantProps } from '../../services/withTenant';
import { BreadCrumbs, Container, PaddedPaper } from '../common';
import UploadFileDialog from '../common/uploadFileDialog';
import { deleteFile, FileItem, getFiles } from './filesApi';
import { uploadFile } from './filesApi';
import FilesTable from './filesTable';

class FilesPage extends React.Component<Props, State> {

    state: State = {
        files: [],
        showUploadDialog: false,
    };

    componentDidMount() {
        this._refreshFilesTable();
    }

    _refreshFilesTable = () => {
        getFiles(this.props.selectedTenant.tenantId)
            .then((files) => {
                this.setState({ files });
            })
            .catch(() => {
                notify('An error occured while retrieving the list of files', 'ERROR');
            });
    }

    _onNewFileUploadClicked = () => {
        this.setState({ showUploadDialog: true });
    }

    _onCloseUploadDialog = (refresh?: boolean) => {
        this.setState({ showUploadDialog: false });

        if (refresh) {
            this._refreshFilesTable();
        }
    }

    _onDeleteFile = (key: string) => {
        deleteFile(this.props.selectedTenant.tenantId, key)
            .then(() => {
                notify(`File: '${key} was deleted successfully'`, 'INFO');
                this._refreshFilesTable();
            })
            .catch(() => notify('An error occured while deleting your file', 'ERROR'));
    }

    _uploadFile = (file: File) => {
        return uploadFile(this.props.selectedTenant.tenantId, file);
    }

    render() {
        const breadCrumbItems = [
            { text: 'Files' },
        ];

        return (
            <div>
                <BreadCrumbs
                    rootItemText={this.props.selectedTenant.site}
                    items={breadCrumbItems}
                />
                <PaddedPaper>
                    <Typography variant="headline">Uploaded files</Typography>
                    <Container>
                        <Button
                            onClick={this._onNewFileUploadClicked}
                            color="primary"
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
                    uploadFile={ this._uploadFile }
                />
            </div>);
    }
}

interface State {
    files: FileItem[];
    showUploadDialog: boolean;
}

interface Props extends UserProps, WithTenantProps {}

const WrappedWithTenant = withTenant<UserProps>(FilesPage);

export default withUser<{}>(WrappedWithTenant);
