import { FormControl, TextField } from '@material-ui/core';
import * as React from 'react';
import { PaddedPaper } from '../common';
import { Container } from '../common';
import EditModel from './models/edit';

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
    model: EditModel;
    onPropertyChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    createMode?: boolean;
    children?: JSX.Element;
}

export default TenantForm;
