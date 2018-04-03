import AppBar from 'material-ui/AppBar';
import Button from 'material-ui/Button';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import * as PropTypes from 'prop-types';
import * as React from 'react';
import { match } from 'react-router-dom';
import { BreadCrumbs, ProgressIndicator } from '../../components/common';
import { notify } from '../../services/notificationService';
import { UserProps, withUser } from '../../services/userProvider';
import { withTenant, WithTenantProps } from '../../services/withTenant';
import ContentPageForm from './contentPageForm';
import { saveContentPage } from './contentPagesApi';
import EditModel from './models/edit';

class CreateContentPage extends React.Component<Props, State> {

    state: State = {
        model: new EditModel(),
    };
    _onPropertyChange = (e: React.FormEvent<HTMLInputElement>) => {
        this.state.model.update(e.currentTarget.name, e.currentTarget.value);
        this.forceUpdate();
    }

    _onUpdate = (e: React.FormEvent<HTMLElement>) => {
        e.preventDefault();

        saveContentPage(this.props.selectedTenant.tenantId, this.state.model)
        .then(() => {
            notify('Content page created.', 'INFO');
        })
        .catch((err) => {
            notify(err, 'ERROR');
        });
    }

    render() {
        const breadCrumbItems = [
            { text: 'ContentPages', url: '/admin/contentpages' },
            { text: 'Create new' },
        ];
        return (<div>
                    <BreadCrumbs items={breadCrumbItems} />

                    <ContentPageForm
                        model={this.state.model}
                        onPropertyChange={this._onPropertyChange}
                    >
                        <Button
                            disabled={!this.state.model.isValid()}
                            color="primary"
                            raised
                            onClick={this._onUpdate}
                        >Create and close</Button>
                    </ContentPageForm>
                </div>);
    }
}

interface Props extends UserProps, WithTenantProps {}

interface State {
    model: EditModel;
}

const WrappedWithTenant = withTenant<UserProps>(CreateContentPage);

export default withUser<{}>(WrappedWithTenant);
