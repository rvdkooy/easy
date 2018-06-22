import { Button, Dialog, DialogActions, DialogContent,
    DialogContentText, DialogTitle, Typography } from '@material-ui/core';
import * as React from 'react';
import { notify } from '../../services/notificationService';
import { UserProps, withUser } from '../../services/userProvider';
import { withTenant, WithTenantProps } from '../../services/withTenant';
import { Container } from '../common';
import { uploadFile } from './filesService';

class UploadFileDialog extends React.Component<InnerProps, State> {

    state: State = {
        fileName: null,
    };

    _form: HTMLFormElement = null;
    _fileInput: HTMLInputElement = null;

    _onFileInputChange = () => {
        if (!this._fileInput.files.length) {
            this.setState({ fileName: null });
        } else {
            this.setState({ fileName: this._fileInput.files[0].name });
        }
    }

    _uploadClicked = () => {
        const file = this._fileInput.files[0];

        uploadFile(this.props.selectedTenant.tenantId, file)
            .then(() => {
                notify(`File: ${file.name} uploaded successfully.`, 'INFO');
                this.props.onClose(true);
            })
            .catch((err) => {
                notify(`An error occured while uploading your file`, 'ERROR');
            });
    }

    _onClose = () => {
        this.setState({ fileName: null });
        this.props.onClose();
    }

    render() {
        return (
            <Dialog
                fullWidth
                open={this.props.open}
                onClose={this._onClose}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">File Upload dialog</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Select a file from your local computer to upload.
                    </DialogContentText>
                    <Container>
                        <form ref={(form) => this._form = form}
                                action=""
                                method="post"
                                encType="multipart/form-data"
                        >
                            <input
                                onChange={this._onFileInputChange}
                                ref={((input) => this._fileInput = input)}
                                style={{ display: 'none' }}
                                id="file-upload-input"
                                type="file"
                            />
                        </form>
                        <label htmlFor="file-upload-input">
                            <Button component="span" color="primary">
                                Select file
                            </Button>
                        </label>
                        <Typography>{ this.state.fileName }</Typography>
                    </Container>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this._onClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={this._uploadClicked} color="primary" disabled={!!!this.state.fileName}>
                        Upload
                </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

interface State {
    fileName: string;
}

interface OuterProps {
    open: boolean;
    onClose: (refresh?: boolean) => void;
}

interface InnerProps extends OuterProps, WithTenantProps, UserProps {  }

const WrappedWithTenant = withTenant<UserProps>(UploadFileDialog);

export default withUser<OuterProps>(WrappedWithTenant);
