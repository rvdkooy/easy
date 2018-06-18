import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import * as React from 'react';
import { Link } from 'react-router-dom';
import { notify } from '../../services/notificationService';
import { UserProps, withUser } from '../../services/userProvider';
import { withTenant, WithTenantProps } from '../../services/withTenant';
import { BreadCrumbs, Container, PaddedPaper } from '../common';
import { deleteFile, FileItem, getFiles } from './filesService';
import FilesTable from './filesTable';
import UploadFileDialog from './uploadFileDialog';

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

    render() {
        const breadCrumbItems = [
            { text: 'Files' },
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
    files: FileItem[];
    showUploadDialog: boolean;
}

interface Props extends UserProps, WithTenantProps {}

const WrappedWithTenant = withTenant<UserProps>(FilesPage);

export default withUser<{}>(WrappedWithTenant);
