import { Button, Typography, WithStyles } from '@material-ui/core';
import * as React from 'react';
import { notify } from '../../services/notificationService';
import { UserProps, withUser } from '../../services/userProvider';
import { withTenant, WithTenantProps } from '../../services/withTenant';
import { Alert, BreadCrumbs, Container, PaddedPaper } from '../common';
import UploadFileDialog from '../common/uploadFileDialog';
import { deleteFile, FileItem, getFiles } from '../files/filesService';

class ThemePage extends React.Component<Props, State> {

    state: State = {
        showUploadDialog: false,
        currentTheme: null,
    };

    // componentDidMount() {
    //     this._refreshFilesTable();
    // }

    // _refreshFilesTable = () => {
    //     getFiles(this.props.selectedTenant.tenantId)
    //         .then((files) => {
    //             this.setState({ files });
    //         })
    //         .catch(() => {
    //             notify('An error occured while retrieving the list of files', 'ERROR');
    //         });
    // }

    _onNewThemeUploadClicked = () => {
        this.setState({ showUploadDialog: true });
    }

    _onCloseUploadDialog = (refresh?: boolean) => {
        this.setState({ showUploadDialog: false });

        // if (refresh) {
        //     this._refreshFilesTable();
        // }
    }

    _onDeleteTheme = (key: string) => {
        // deleteFile(this.props.selectedTenant.tenantId, key)
        //     .then(() => {
        //         notify(`File: '${key} was deleted successfully'`, 'INFO');
        //         this._refreshFilesTable();
        //     })
        //     .catch(() => notify('An error occured while deleting your file', 'ERROR'));
    }

    render() {
        const { currentTheme } = this.state;
        const breadCrumbItems = [
            { text: 'Theme' },
        ];

        return (
            <div>
                <BreadCrumbs items={breadCrumbItems} />
                <PaddedPaper>
                    <Typography variant="headline">Theme</Typography>
                    <Container>
                        {
                            (currentTheme) ?
                                <Typography variant="headline">{ `Current theme: ${currentTheme}` }</Typography> :
                                <Alert message="No theme uploaded!" />
                        }
                    </Container>
                    <Container>
                        <Button
                            onClick={this._onNewThemeUploadClicked}
                            color="primary"
                        >
                            Upload new theme
                        </Button>
                    </Container>
                </PaddedPaper>
                <UploadFileDialog
                    open={ this.state.showUploadDialog }
                    onClose={ this._onCloseUploadDialog }
                />
            </div>);
    }
}

interface State {
    showUploadDialog: boolean;
    currentTheme?: string;
}

interface Props extends UserProps, WithTenantProps, WithStyles<'warning' | 'message'> {}

export default withTenant<{}>(withUser<WithTenantProps>(ThemePage));
