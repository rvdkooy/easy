import { Snackbar } from '@material-ui/core';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import { StyleRulesCallback } from '@material-ui/core/styles';
import { Done as DoneIcon, Error as ErrorIcon } from '@material-ui/icons';
import * as PropTypes from 'prop-types';
import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import { listenToNotifications, messageType } from '../../services/notificationService';
import { Tenant } from '../../services/userApi';
import { UserProps, withUser } from '../../services/userProvider';
import ContentPagesPage from '../contentpages/contentPagesPage';
import Dashboard from '../dashboard/main';
import FilesPage from '../files/filesPage';
import LogsPage from '../logging/logsPage';
import TenantsPage from '../tenants/tenantsPage';
import ThemePage from '../themes/themePage';
import UsersPage from '../users/usersPage';
import withRoot from '../withRoot';
import Header from './header';
import LeftMenu from './leftMenu';

const styles: StyleRulesCallback<'root' | 'rightContent' | 'mainContent' | 'snackbarIcon'> = (theme) => ({
    root: {
        marginTop: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
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
    },
    snackbarIcon: {
        verticalAlign: 'top',
        marginRight: 8,
    },
});

class Layout extends React.Component<Props, State> {
    _unregisterListenToNotifications: () => void | null = null;

    static childContextTypes = {
        selectedTenant: PropTypes.object,
    };

    getChildContext() {
        return {
            selectedTenant: this.state.selectedTenant,
        };
    }

    state: State = {
        snackbarMessage: null,
        selectedTenant: this.props.currentUser.tenants[0],
    };

    _closeSnackbar = () => {
        this.setState({ snackbarMessage: null });
    }

    _showSnackbar = (message: string, type: messageType) => {
        this.setState({ snackbarMessage: { message, type } });
    }

    componentDidMount() {
        this._unregisterListenToNotifications = listenToNotifications(this._showSnackbar);
    }

    componentWillUnmount() {
        this._unregisterListenToNotifications && this._unregisterListenToNotifications();
    }

    _onTenantChanged = (site: string) => {
        const tenant = this.props.currentUser.tenants.find((t) => t.site === site);
        this.setState({ selectedTenant: tenant });
    }

    _renderSnackbarContent = () => {
        if (!this.state.snackbarMessage) { return null; }

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
    }

    render() {
        const { classes } = this.props;

        return (
          <div className={classes.root}>
            <Header onTenantChanged={this._onTenantChanged} />
            <div className={classes.mainContent}>
                <LeftMenu open />
                <div className={classes.rightContent}>
                    <Switch>
                        <Route exact path="/admin" component={Dashboard} />
                        <Route path="/admin/users" component={UsersPage} />
                        <Route path="/admin/logs" component={LogsPage} />
                        <Route path="/admin/files" component={FilesPage} />
                        <Route path="/admin/tenants" component={TenantsPage} />
                        <Route path="/admin/contentpages" component={ContentPagesPage} />
                        <Route path="/admin/theme" component={ThemePage} />
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
                  ContentProps={{
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
        type: messageType,
    };
    selectedTenant: Tenant;
}

interface Props extends UserProps, WithStyles<'root' | 'rightContent' | 'mainContent' | 'snackbarIcon'> { }

export default withRoot(withUser<{}>(withStyles(styles)<Props>(Layout)));
