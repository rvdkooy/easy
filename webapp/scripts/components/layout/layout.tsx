import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import { withStyles, WithStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import { Theme } from 'material-ui/styles';
import Snackbar from 'material-ui/Snackbar';
import DoneIcon from 'material-ui-icons/Done';
import ErrorIcon from 'material-ui-icons/ErrorOutline';
import withRoot from '../withRoot';

import LeftMenu from './leftMenu';
import Header from './header';
import Dashboard from '../dashboard/main';
import UsersPage from '../users/usersPage';
import LogsPage from '../logging/logsPage';
import ContentPagesPage from '../contentpages/contentPagesPage';
import FilesPage from '../files/filesPage';
import { listenToNotifications, messageType } from '../../services/notificationService';

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
    snackbarIcon: {
        verticalAlign: 'top',
        marginRight: 8
    }
});

class Layout extends React.Component<Props, State> {
    _unregisterListenToNotifications: () => void | null = null;
    state: State = {
        snackbarMessage: null,
    }
    
    _closeSnackbar = () => {
        this.setState({ snackbarMessage: null });
    };
    
    _showSnackbar = (message: string, type: messageType) => {
        this.setState({ snackbarMessage: { message, type } });
    };
    
    componentDidMount() {
        this._unregisterListenToNotifications = listenToNotifications(this._showSnackbar);
    }

    componentWillUnmount() {
        this._unregisterListenToNotifications && this._unregisterListenToNotifications();
    }

    _renderSnackbarContent = () => {
        if (!this.state.snackbarMessage) return null;
        
        return (
            <div id="message-id">
                {
                    (this.state.snackbarMessage.type === 'INFO') ?
                        (<DoneIcon className={this.props.classes.snackbarIcon} />) :
                        (<ErrorIcon className={this.props.classes.snackbarIcon} />)
                }
                <span>{ this.state.snackbarMessage.message }</span>
            </div>
        );
    };

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
                        <Route path='/admin/files' component={FilesPage} />
                        <Route path='/admin/contentpages' component={ContentPagesPage} />
                    </Switch>
                </div>
            </div>
            <Snackbar
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={!!this.state.snackbarMessage}
                  autoHideDuration={4000}
                  onClose={this._closeSnackbar}
                  SnackbarContentProps={{
                    'aria-describedby': 'message-id',
                  }}
                  message={this._renderSnackbarContent()}
            />
          </div>
        );
    }
}

interface State {
    snackbarMessage: {
        message: string,
        type: messageType
    };
}

interface Props extends WithStyles<'root' | 'rightContent' | 'mainContent' | 'snackbarIcon'> { }

export default withRoot(withStyles(styles)<Props>(Layout));