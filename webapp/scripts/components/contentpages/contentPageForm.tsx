import { FormControl } from 'material-ui/Form';
import Paper from 'material-ui/Paper';
import { Theme, withStyles, WithStyles } from 'material-ui/styles';
import Tabs, { Tab } from 'material-ui/Tabs';
import TextField from 'material-ui/TextField';
import * as React from 'react';

import { Container, PaddedPaper } from '../common';
import EditModel from './models/edit';

const styles = (theme: Theme) => ({
    root: theme.mixins.gutters({}),
});

class ContentPageForm extends React.Component<Props, State> {

    state: State = {
        selectedTab: 0,
    };

    _changeTab = (evt: any, value: number) => {
        this.setState({ selectedTab: value });
    }

    _renderContentTab = () => {
        const { model, onPropertyChange } = this.props;
        return (
            <div>
                <Container>
                    <FormControl fullWidth>
                        <TextField
                            onChange={onPropertyChange}
                            name="title"
                            label="Title"
                            value={model.title}
                            margin="dense"
                        />
                    </FormControl>
                </Container>
                <Container>
                    <FormControl fullWidth>
                        <TextField
                            onChange={onPropertyChange}
                            name="url"
                            label="Url"
                            value={model.url}
                            margin="dense"
                        />
                    </FormControl>
                </Container>
                <Container>
                    <FormControl fullWidth>
                        <TextField
                            onChange={onPropertyChange}
                            name="content"
                            multiline
                            rows={8}
                            label="Content"
                            value={model.content}
                            margin="dense"
                        />
                    </FormControl>
                </Container>
            </div>
        );
    }

    _renderMetaDataTab = () => {
        const { model, onPropertyChange } = this.props;

        return (
            <div>
                <Container>
                    <FormControl fullWidth>
                        <TextField
                            onChange={onPropertyChange}
                            multiline
                            rows={4}
                            name="description"
                            label="Description"
                            value={model.description}
                            margin="dense"
                        />
                    </FormControl>
                </Container>
                <Container>
                    <FormControl fullWidth>
                        <TextField
                            onChange={onPropertyChange}
                            multiline
                            rows={4}
                            name="keywords"
                            label="Keywords"
                            value={model.keywords}
                            margin="dense"
                        />
                    </FormControl>
                </Container>
            </div>
        );
    }

    render() {
        const { model, onPropertyChange, classes } = this.props;

        return (
            <div>
                <Paper>
                    <Tabs
                        indicatorColor="primary"
                        textColor="primary"
                        value={this.state.selectedTab}
                        onChange={this._changeTab}
                        fullWidth
                    >
                        <Tab label="Content" />
                        <Tab label="Meta data" />
                    </Tabs>
                </Paper>
                <PaddedPaper>
                    <div className={classes.root}>
                        <form>
                            {this.state.selectedTab === 0 && this._renderContentTab()}
                            {this.state.selectedTab === 1 && this._renderMetaDataTab()}
                            {this.props.children}
                        </form>
                    </div>
                </PaddedPaper>

            </div>
        );
    }
}

interface Props extends OuterProps, WithStyles<'root'> {

}

interface OuterProps {
    children: any;
    model: EditModel;
    onPropertyChange: (e: React.FormEvent<HTMLInputElement>) => void;
}

interface State {
    selectedTab: number;
}

export default withStyles(styles)<OuterProps>(ContentPageForm);
