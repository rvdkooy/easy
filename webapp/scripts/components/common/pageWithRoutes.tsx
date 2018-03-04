import * as React from 'react';
import { Switch, match } from 'react-router';

interface Props {
    match: match<{}>
}

type PageWithRoutsArg = (match: match<{}>) => JSX.Element[];


const pageWithRoutes = (arg: PageWithRoutsArg) => {
    
    const PageWithRoutes = (props: Props) => {

        return (
            <Switch>
                { arg(props.match) }
            </Switch>
        );
    }

    return PageWithRoutes;
}

export default pageWithRoutes;

