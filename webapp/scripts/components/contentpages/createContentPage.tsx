import { Button } from '@material-ui/core';
import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import { BreadCrumbs } from '../../components/common';
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
            this.props.history.push('/admin/contentpages');
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
                    <BreadCrumbs
                        rootItemText={this.props.selectedTenant.site}
                        items={breadCrumbItems}
                    />

                    <ContentPageForm
                        model={this.state.model}
                        onPropertyChange={this._onPropertyChange}
                    >
                        <Button
                            disabled={!this.state.model.isValid()}
                            variant="raised"
                            color="primary"
                            onClick={this._onUpdate}
                        >Create and close</Button>
                    </ContentPageForm>
                </div>);
    }
}

interface Props extends UserProps, WithTenantProps, RouteComponentProps<any> {}

interface State {
    model: EditModel;
}

const RouterWrapped = withRouter(CreateContentPage);
const TenantWrapped = withTenant<UserProps>(RouterWrapped);

export default withUser(TenantWrapped);
