import * as React from 'react';
import { match } from 'react-router-dom';
import { Switch, Route } from 'react-router';
import ContentPagesList from './contentPagesList';
import CreateContentPage from './createContentPage';

class ContentPagesPage extends React.Component<Props> {
    render() {
        const { match } = this.props;
        
        return (
            <Switch>
                <Route exact path={`${match.url}`} component={ContentPagesList} />
                <Route exact path={`${match.url}/new`} component={CreateContentPage} />
                
            </Switch>
        );
    }
}

interface Props {
    match: match<{ }>
}

export default ContentPagesPage;