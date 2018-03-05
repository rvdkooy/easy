import * as React from 'react';
import * as PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import Avatar from 'material-ui/Avatar';
import { FormControl } from 'material-ui/Form';
import { PaddedPaper } from '../common';
import EditModel from './models/edit';
import { Container } from '../common';

const TenantForm = (props: Props) => {
    const { model, onPropertyChange, createMode, children } = props;
    return (
        <PaddedPaper>
            <form>
                { !props.createMode && 
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
                }
                <Container>
                    <FormControl fullWidth>
                        <TextField
                            onChange={onPropertyChange}
                            label="Email"
                            value={model.email || ''}
                            disabled={!props.createMode}
                            margin="dense"
                            name="email"
                        />
                    </FormControl>
                </Container>
                <Container>
                    <FormControl fullWidth>
                        <TextField
                            onChange={onPropertyChange}
                            label="Sites"
                            value={model.sites || ''}
                            disabled={!props.createMode}
                            margin="dense"
                            name="sites"
                        />
                    </FormControl>
                </Container>
                { children }
            </form>
        </PaddedPaper>
    );
};

interface Props {
    model: EditModel,
    onPropertyChange: (e: React.FormEvent<HTMLInputElement>) => void,
    createMode?: boolean,
    children?: JSX.Element
}

export default TenantForm;
