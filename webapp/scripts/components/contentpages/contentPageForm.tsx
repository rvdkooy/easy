import * as React from 'react';
import * as PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import { FormControl } from 'material-ui/Form';
import EditModel from './models/edit';
import { Container } from '../common';

const ContentPageForm = (props: Props) => {
    const { model, onPropertyChange, onSubmit } = props;
    return (
        <form>
            <Container>
                <FormControl fullWidth>
                    <TextField
                        onChange={props.onPropertyChange}
                        name="name"
                        label="Name"
                        value={model.name}
                        margin="dense"
                    />
                </FormControl>
            </Container>
            <Container>
                <FormControl fullWidth>
                    <TextField
                        onChange={props.onPropertyChange}
                        name="url"
                        label="Url"
                        value={model.url}
                        margin="dense"
                    />
                </FormControl>
            </Container>
            <Container>
                <FormControl fullWidth>
                    <TextField
                        onChange={props.onPropertyChange}
                        name="content"
                        multiline
                        rows={8}
                        label="Content"
                        value={model.content}
                        margin="dense"
                    />
                </FormControl>
            </Container>
            {props.children}
        </form>
    );
};

interface Props {
    children: any,
    model: EditModel,
    onPropertyChange: (e: React.FormEvent<HTMLInputElement>) => void,
    onSubmit: (e: React.FormEvent<HTMLButtonElement>) => void
}

export default ContentPageForm;
