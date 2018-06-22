import { Button, Dialog, DialogActions,
    DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import * as React from 'react';

class ConfirmModal extends React.PureComponent<Props> {
    public static defaultProps = {
        title: '',
        className: '',
        // tslint:disable-next-line no-empty
        onDeny: () => {},
    };

    _modalFooterRef: any;
    _confirmBtnRef: any;
    _onDenied = () => {
        this.props.onHide();
        this.props.onDeny && this.props.onDeny();
    }

    _onConfirmed = () => {
        this.props.onHide();
        this.props.onConfirm();
    }

    render() {
        return (
            <Dialog open={this.props.show} onClose={this.props.onHide}>
                <DialogTitle>{ this.props.title }</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        { this.props.children }
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this._onConfirmed} color="primary" autoFocus>
                        Yes
                    </Button>
                    <Button onClick={this._onDenied} color="primary">
                        No
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

interface Props {
    title: string;
    show: boolean;
    onHide: () => void;
    onConfirm: () => void;
    onDeny?: () => void;
    className?: string;
    children?: any;
}

export default ConfirmModal;
