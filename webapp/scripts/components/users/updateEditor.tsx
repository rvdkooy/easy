import * as React from 'react';
import * as PropTypes from 'prop-types';
import { match } from 'react-router-dom';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import { ProgressIndicator, BreadCrumbs, PaddedPaper } from '../../components/common';
import UserForm from './userForm';
import { getUser, updateUser } from './usersApi';
import EditModel from './models/edit';

class UpdateEditor extends React.Component<Props, State> {

    state: State = {
        model: null,
        isLoading: true
    };

    componentDidMount() {
        getUser(this.props.match.params.id)
            .then((model) => {
                this.setState({
                    model,
                    isLoading: false
                });
            })
            .catch(err => {
                this.setState({ isLoading: false });
            });
    }

    _onPropertyChange = (e: React.MouseEvent<HTMLInputElement>) => {
        this.state.model.update(e.currentTarget.name, e.currentTarget.value);
        this.forceUpdate();
    };

    _onUpdate = (e: React.FormEvent<HTMLElement>) => {
        e.preventDefault();

        updateUser(this.state.model).then(() => {
            // show confirm message
        }, (err: Error) => { }); // show error message
    };

    render() {
        const breadCrumbItems = [
            { text: 'Users', url: '/admin/users' },
            { text: 'User details' }
        ];

        return (
            <div>
                <BreadCrumbs items={breadCrumbItems} />
                <PaddedPaper>
                    <Typography type="headline">User details</Typography>
                    {
                        (this.state.isLoading) ?
                            <ProgressIndicator /> :
                            <UserForm
                                model={this.state.model}
                                onPropertyChange={this._onPropertyChange}
                                onSubmit={this._onUpdate}>
                                <Button
                                    disabled
                                    color="primary"
                                    raised
                                    onClick={this._onUpdate}
                                >Update</Button>
                            </UserForm>
                    }
                </PaddedPaper>
            </div>
        );
    }
}

interface Props {
    match: match<{ id: string }>
}

interface State {
    model: EditModel,
    isLoading: boolean
}

export default UpdateEditor;