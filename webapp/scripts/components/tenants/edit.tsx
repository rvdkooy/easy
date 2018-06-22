import { Button } from '@material-ui/core';
import * as React from 'react';
import { match } from 'react-router-dom';
import { BreadCrumbs, ProgressIndicator } from '../../components/common';
import { notify } from '../../services/notificationService';
import { UserProps, withUser } from '../../services/userProvider';
import { getTenant, updateTenant } from './api';
import Form from './form';
import EditModel from './models/edit';

class EditTenant extends React.Component<Props, State> {
    state: State = {
        model: null,
        isLoading: true,
    };

    componentDidMount() {
        getTenant(this.props.match.params.id)
            .then((model) => {
                this.setState({
                    model,
                    isLoading: false,
                });
            })
            .catch((err) => {
                this.setState({ isLoading: false });
                notify('An error occured while retrieving the tenant.', 'ERROR');
            });
    }

    _onPropertyChange = (e: React.FormEvent<HTMLInputElement>) => {
        this.forceUpdate();
    }

    _onSubmit = (e: React.MouseEvent<HTMLInputElement>) => {
        e.preventDefault();

        updateTenant(this.state.model).then(() => {
            notify('Tenant changed.', 'INFO');
        }, (err: Error) => notify('An error occured while updating the tenant', 'ERROR'));
    }

    render() {
        const breadCrumbItems = [
            { text: 'Tenants', url: '/admin/tenants' },
            { text: 'Edit' },
        ];

        return (
            <div>
                <BreadCrumbs items={breadCrumbItems} />
                { (this.state.isLoading && <ProgressIndicator />) }
                {
                    (this.state.model && <Form
                        model={this.state.model}
                        onPropertyChange={this._onPropertyChange}
                    >
                        <Button
                            disabled={!this.state.model.isValid()}
                            color="primary"
                            onClick={this._onSubmit}
                        >Update</Button>
                    </Form>)
                }
            </div>
        );
    }
}

interface Props extends UserProps {
    match: match<{ id: string }>;
}

interface State {
    model: EditModel;
    isLoading: boolean;
}

export default withUser<{}>(EditTenant);
