import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import Paper from 'material-ui/Paper';
import { withStyles, WithStyles } from 'material-ui/styles';
import { Theme } from 'material-ui/styles';
import withRoot from '../withRoot';

import LeftMenu from './leftMenu';
import Header from './header';
import Dashboard from '../dashboard/main';
// import UsersContainer from '../users/usersContainer';
// import LogsPage from '../logs/logsPage';

const styles = (theme: Theme) => ({
    root: {
        marginTop: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column'
    } as React.CSSProperties, // somehow this is needed for the 'flexDirection' property
    rightContent: theme.mixins.gutters({
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
        display: 'flex',
        flex: '1 1 auto',
        flexDirection: 'column',
        marginLeft: theme.spacing.unit * 2,
        marginRight: theme.spacing.unit * 2,
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
                <Paper className={classes.rightContent}>
                    <Switch>
                        <Route exact path='/' component={Dashboard} />
                        <Route path='/users' component={null} />
                        <Route path='/logs' component={null} />
                    </Switch>
                </Paper>
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