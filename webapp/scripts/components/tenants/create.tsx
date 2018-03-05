import * as React from 'react';
import * as PropTypes from 'prop-types';
import { match } from 'react-router-dom';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import { ProgressIndicator, BreadCrumbs } from '../../components/common';
import Form from './form';
import { saveTenant } from './api';
import EditModel from './models/edit';
import { notify } from '../../services/notificationService';
import { withUser, UserProps } from '../../services/userProvider';

class CreateContentPage extends React.Component<UserProps, State> {
    
    state: State = { 
        model: new EditModel()
    };
    
    _onPropertyChange = (e: React.FormEvent<HTMLInputElement>) => {
        if (e.currentTarget.name === 'email') {
            this.state.model.email = e.currentTarget.value;
        }

        if (e.currentTarget.name === 'sites') {
            this.state.model.sites = e.currentTarget.value;
        }
        
        this.forceUpdate();
    };

    _onUpdate = (e: React.FormEvent<HTMLElement>) => {
        e.preventDefault();

        saveTenant(this.state.model).then(() => {
            notify('Tenant created.', 'INFO');
        }, (err: Error) => {}); // show error message
    };
    
    render() {
        const breadCrumbItems = [
            { text: 'Tenants', url: '/admin/tenants' },
            { text: 'Create new' }
        ];
        return (<div>
                    <BreadCrumbs items={breadCrumbItems} />

                    <Form
                        model={this.state.model}
                        onPropertyChange={this._onPropertyChange}
                        createMode
                    >
                        <Button
                            disabled={!this.state.model.isValid()}
                            color="primary"
                            raised
                            onClick={this._onUpdate}
                        >Create and close</Button>                      
                    </Form>  
                </div>);
    }
}

interface State {
    model: EditModel
}

export default withUser<{}>(CreateContentPage);