import * as React from 'react';
import * as PropTypes from 'prop-types';
import { match } from 'react-router-dom';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';

import { ProgressIndicator, BreadCrumbs } from '../../components/common';
import Form from './form';
import { getTenant, updateTenant } from './api';
import EditModel from './models/edit';
import { notify } from '../../services/notificationService';
import { withUser, UserProps } from '../../services/userProvider';

class EditTenant extends React.Component<Props, State> {
    state: State = {
        model: null,
        isLoading: true
    };

    componentDidMount() {
        getTenant(this.props.match.params.id)
            .then((model) => {
                this.setState({
                    model,
                    isLoading: false
                });
            })
            .catch(err => {
                this.setState({ isLoading: false });
                notify('An error occured while retrieving the tenant.', 'ERROR');
            });
    }

    _onPropertyChange = (e: React.FormEvent<HTMLInputElement>) => {
        //this.state.model.update(e.currentTarget.name, e.currentTarget.value);
        this.forceUpdate();
    };

    _onSubmit = (e: React.MouseEvent<HTMLInputElement>) => {
        e.preventDefault();

        updateTenant(this.state.model).then(() => {
            notify('Tenant changed.', 'INFO');
        }, (err: Error) => { }); // show error message
    };

    render() {
        const breadCrumbItems = [
            { text: 'Tenants', url: '/admin/tenants' },
            { text: 'Edit' }
        ];

        return (
            <div>
                <BreadCrumbs items={breadCrumbItems} />
                { (this.state.isLoading && <ProgressIndicator />) }
                {
                    (this.state.model && <Form
                        model={this.state.model}
                        onPropertyChange={this._onPropertyChange}
                        onSubmit={this._onSubmit}
                    >
                        <Button
                            disabled={!this.state.model.isValid()}
                            color="primary"
                            raised
                            onClick={this._onSubmit}
                        >Update</Button>
                    </Form>)
                }
            </div>
        );
    }
}

interface Props extends UserProps {
    match: match<{ id: string }>
}

interface State {
    model: EditModel,
    isLoading: boolean
}

export default withUser<{}>(EditTenant);