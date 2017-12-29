import * as React from 'react';
import * as PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import Avatar from 'material-ui/Avatar';
import { FormControl } from 'material-ui/Form';
import EditModel from './models/edit';
import { Container } from '../common';

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
        </form>
    );
};

interface Props {
    model: EditModel,
    onPropertyChange: (e: React.FormEvent<HTMLInputElement>) => void,
    onSubmit: (e: React.FormEvent<HTMLButtonElement>) => void
}

export default UserForm;
