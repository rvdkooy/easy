import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import { withStyles, WithStyles } from 'material-ui/styles';
import { Theme } from 'material-ui/styles';
import withRoot from '../withRoot';

import LeftMenu from './leftMenu';
import Header from './header';
import Dashboard from '../dashboard/main';
import UsersPage from '../users/usersPage';
import LogsPage from '../logging/logsPage';
import ContentPagesPage from '../contentpages/contentPagesPage';

const styles = (theme: Theme) => ({
    root: {
        marginTop: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column'
    } as React.CSSProperties, // somehow this is needed for the 'flexDirection' property
    rightContent: theme.mixins.gutters({
        paddingBottom: theme.spacing.unit * 2,
        display: 'flex',
        flex: '1 1 auto',
        flexDirection: 'column',
        
    }),
    mainContent: {
        flexDirection: 'row',
        flex: '1 0 auto',
        display: 'flex',
    } as React.CSSProperties,
});

class Layout extends React.Component<Props, State> {
    
    state: State = {
        menuOpen: false
    }

    _onOpenMenu = () => {
        this.setState({ menuOpen: true });
    }

    _onCloseMenu = () => {
        this.setState({ menuOpen: false });
    }
    
    render() {
        const { classes } = this.props;

        return (
          <div className={classes.root}>
            <Header />
            <div className={classes.mainContent}>
                <LeftMenu open onClose={() => {}}  />
                <div className={classes.rightContent}>
                    <Switch>
                        <Route exact path='/admin' component={Dashboard} />
                        <Route path='/admin/users' component={UsersPage} />
                        <Route path='/admin/logs' component={LogsPage} />
                        <Route path='/admin/contentpages' component={ContentPagesPage} />
                    </Switch>
                </div>
            </div>
          </div>
        );
    }
}

interface State {
    menuOpen: boolean;
}

interface Props extends WithStyles<'root' | 'rightContent' | 'mainContent'> { }

export default withRoot(withStyles(styles)<Props>(Layout));