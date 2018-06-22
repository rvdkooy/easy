import { Button } from '@material-ui/core';
import * as React from 'react';
import { match } from 'react-router-dom';
import { BreadCrumbs, ProgressIndicator } from '../../components/common';
import { notify } from '../../services/notificationService';
import { UserProps, withUser } from '../../services/userProvider';
import { withTenant, WithTenantProps } from '../../services/withTenant';
import ContentPageForm from './contentPageForm';
import { getContentPage, updateContentPage } from './contentPagesApi';
import EditModel from './models/edit';

class EditContentPage extends React.Component<Props, State> {
    state: State = {
        model: null,
        isLoading: true,
    };

    componentDidMount() {
        getContentPage(this.props.selectedTenant.tenantId, this.props.match.params.id)
            .then((model) => {
                this.setState({
                    model,
                    isLoading: false,
                });
            })
            .catch((err) => {
                this.setState({ isLoading: false });
                notify('An error occured while retrieving the content page.', 'ERROR');
            });
    }

    _onPropertyChange = (e: React.FormEvent<HTMLInputElement>) => {
        this.state.model.update(e.currentTarget.name, e.currentTarget.value);
        this.forceUpdate();
    }

    _onSubmit = (e: React.MouseEvent<HTMLInputElement>) => {
        e.preventDefault();

        updateContentPage(this.props.selectedTenant.tenantId, this.state.model)
        .then(() => {
            notify('Content page changed.', 'INFO');
        })
        .catch((err) => {
            notify(err, 'ERROR');
        });
    }

    render() {
        const breadCrumbItems = [
            { text: 'Content Pages', url: '/admin/contentpages' },
            { text: 'Edit' },
        ];

        return (
            <div>
                <BreadCrumbs items={breadCrumbItems} />
                {
                    (this.state.isLoading) ?
                        <ProgressIndicator /> :
                        <ContentPageForm
                            model={this.state.model}
                            onPropertyChange={this._onPropertyChange}
                        >
                            <Button
                                disabled={!this.state.model.isValid()}
                                color="primary"
                                onClick={this._onSubmit}
                            >Update</Button>
                        </ContentPageForm>
                }
            </div>
        );
    }
}

interface Props extends UserProps, WithTenantProps {
    match: match<{ id: string }>;
}

interface State {
    model: EditModel;
    isLoading: boolean;
}

const WrappedWithTenant = withTenant<UserProps>(EditContentPage);

export default withUser<{}>(WrappedWithTenant);
