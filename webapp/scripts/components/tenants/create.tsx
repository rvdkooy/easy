import { Button } from '@material-ui/core';
import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { BreadCrumbs, ProgressIndicator } from '../../components/common';
import { notify } from '../../services/notificationService';
import { saveTenant } from './api';
import Form from './form';
import EditModel from './models/edit';

class CreateContentPage extends React.Component<Props, State> {

    state: State = {
        model: new EditModel(),
    };

    _onPropertyChange = (e: React.FormEvent<HTMLInputElement>) => {
        if (e.currentTarget.name === 'email') {
            this.state.model.email = e.currentTarget.value;
        }

        if (e.currentTarget.name === 'sites') {
            this.state.model.sites = e.currentTarget.value;
        }

        this.forceUpdate();
    }

    _onUpdate = async (e: React.FormEvent<HTMLElement>) => {
        try {
            e.preventDefault();

            await saveTenant(this.state.model);
            notify('Tenant created.', 'INFO');
            this.props.history.push('/admin/tenants');
        } catch (err) {
            notify('An error occured when creating a tenant.', 'ERROR');
        }
    }

    render() {
        const breadCrumbItems = [
            { text: 'Tenants', url: '/admin/tenants' },
            { text: 'Create new' },
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
                            onClick={this._onUpdate}
                        >Create and close</Button>
                    </Form>
                </div>);
    }
}

interface State {
    model: EditModel;
}

interface Props extends RouteComponentProps<any> { }

export default withRouter(CreateContentPage);
