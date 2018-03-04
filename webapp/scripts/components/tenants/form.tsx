import * as React from 'react';
import * as PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import Avatar from 'material-ui/Avatar';
import { FormControl } from 'material-ui/Form';
import { PaddedPaper } from '../common';
import EditModel from './models/edit';
import { Container } from '../common';

const TenantForm = (props: Props) => {
    const { model, onPropertyChange, onSubmit } = props;
    return (
        <PaddedPaper>
            <form>
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
        </PaddedPaper>
    );
};

interface Props {
    model: EditModel,
    onPropertyChange: (e: React.FormEvent<HTMLInputElement>) => void,
    onSubmit: (e: React.FormEvent<HTMLButtonElement>) => void
}

export default TenantForm;
