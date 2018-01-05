import * as React from 'react';
import * as PropTypes from 'prop-types';
import { match } from 'react-router-dom';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import { ProgressIndicator, BreadCrumbs } from '../../components/common';
import ContentPageForm from './contentPageForm';
import { saveContentPage } from './contentPagesApi';
import EditModel from './models/edit';

class CreateContentPage extends React.Component<undefined, State> {
    
    state: State = { 
        model: new EditModel()
    };
    
    _onPropertyChange = (e: React.FormEvent<HTMLInputElement>) => {
        this.state.model.update(e.currentTarget.name, e.currentTarget.value);
        this.forceUpdate();
    };

    _onUpdate = (e: React.FormEvent<HTMLElement>) => {
        e.preventDefault();

        saveContentPage(this.state.model).then(() => {
            // show confirm message
        }, (err: Error) => {}); // show error message
    };
    
    render() {
        const breadCrumbItems = [
            { text: 'ContentPages', url: '/admin/contentpages' },
            { text: 'Create new' }
        ];
        return (<div>
                    <BreadCrumbs items={breadCrumbItems} />
                    <Typography type="headline">Create new</Typography>
                    <ContentPageForm
                        model={this.state.model}
                        onPropertyChange={this._onPropertyChange}
                        onSubmit={this._onUpdate}>
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

interface State {
    model: EditModel
}

export default CreateContentPage;