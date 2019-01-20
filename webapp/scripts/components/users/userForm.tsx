import { Avatar, FormControl, TextField } from '@material-ui/core';
import * as React from 'react';
import { Container } from '../common';
import EditModel from './models/edit';

const UserForm = (props: Props) => {
    const { model, onPropertyChange, onSubmit } = props;
    return (
        <form>
            <Container>
                <Avatar src={model.photo} />
            </Container>
            <Container>
                <FormControl fullWidth>
                    <TextField
                        label="TenantId"
                        value={model.tenantId}
                        disabled
                        margin="dense"
                    />
                </FormControl>
            </Container>
            <Container>
                <FormControl fullWidth>
                    <TextField
                        label="Display name"
                        value={model.displayName}
                        disabled
                        margin="dense"
                    />
                </FormControl>
            </Container>
            <Container>
                <FormControl fullWidth>
                    <TextField
                        label="Email"
                        value={model.email}
                        disabled
                        margin="dense"
                    />
                </FormControl>
            </Container>
            <Container>
                <FormControl fullWidth>
                    <TextField
                        label="Sites"
                        value={model.sites.join(', ')}
                        disabled
                        margin="dense"
                    />
                </FormControl>
            </Container>
        </form>
    );
};

interface Props {
    model: EditModel;
    onPropertyChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onSubmit: (e: React.FormEvent<HTMLButtonElement>) => void;
}

export default UserForm;
