import * as React from 'react';
import { match } from 'react-router-dom';
import { Switch, Route } from 'react-router';
import ContentPagesList from './contentPagesList';


class ContentPagesPage extends React.Component<Props> {
    render() {
        const { match } = this.props;
        
        return (
            <Switch>
                <Route exact path={`${match.url}`} component={ContentPagesList} />
                
            </Switch>
        );
    }
}

interface Props {
    match: match<{ }>
}

export default ContentPagesPage;