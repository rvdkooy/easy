import * as React from 'react';
import * as PropTypes from 'prop-types';
import { match } from 'react-router-dom';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';

import { ProgressIndicator, BreadCrumbs } from '../../components/common';
import ContentPageForm from './contentPageForm';
import { getContentPage, updateContentPage } from './contentPagesApi';
import EditModel from './models/edit';
import { notify } from '../../services/notificationService';
import { withUser, UserProps } from '../../services/userProvider';

class EditContentPage extends React.Component<Props, State> {
    state: State = {
        model: null,
        isLoading: true
    };

    componentDidMount() {
        getContentPage(this.props.currentUser.tenantId, this.props.match.params.id)
            .then((model) => {
                this.setState({
                    model,
                    isLoading: false
                });
            })
            .catch(err => {
                this.setState({ isLoading: false });
                notify('An error occured while retrieving the content page.', 'ERROR');
            });
    }

    _onPropertyChange = (e: React.FormEvent<HTMLInputElement>) => {
        this.state.model.update(e.currentTarget.name, e.currentTarget.value);
        this.forceUpdate();
    };

    _onSubmit = (e: React.MouseEvent<HTMLInputElement>) => {
        e.preventDefault();

        updateContentPage(this.props.currentUser.tenantId, this.state.model).then(() => {
            notify('Content page changed.', 'INFO');
        }, (err: Error) => { }); // show error message
    };

    render() {
        const breadCrumbItems = [
            { text: 'Content Pages', url: '/admin/contentpages' },
            { text: 'Edit' }
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
                                raised
                                onClick={this._onSubmit}
                            >Update</Button>
                        </ContentPageForm>
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

export default withUser<{}>(EditContentPage);