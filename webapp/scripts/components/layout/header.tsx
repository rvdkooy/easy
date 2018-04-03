import MenuIcon from 'material-ui-icons/Menu';
import AppBar from 'material-ui/AppBar';
import Avatar from 'material-ui/Avatar';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import { MenuItem } from 'material-ui/Menu';
import Select from 'material-ui/Select';
import withStyles, { WithStyles } from 'material-ui/styles/withStyles';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import * as React from 'react';
import { Link } from 'react-router-dom';
import { UserProps, withUser } from '../../services/userProvider';
import { withTenant, WithTenantProps } from '../../services/withTenant';
import LeftMenu from './leftMenu';

const styles = {
    flex: {
        flex: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
    logoutText: {
        marginLeft: 8,
    },
    tenantSelector: {
        backgroundColor: 'white',
        paddingLeft: 8,
        paddingRight: 8,
    },
};

class Header extends React.Component<Props> {
    _renderTenants = () => {
        return this.props.currentUser.tenants.map((t) => {
            return (<MenuItem key={t.tenantId} value={t.site}>{ t.site }</MenuItem>);
        });
    }

    _onTenantChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.props.onTenantChanged(e.target.value);
    }

    render() {
        const { classes, currentUser } = this.props;

        return (
            <AppBar position="static">
                <Toolbar>

                    <Typography type="title" color="inherit" className={classes.flex}>
                        Easy admin system
                    </Typography>
                    <Select
                        className={classes.tenantSelector}
                        value={this.props.selectedTenant.site}
                        onChange={this._onTenantChanged}
                    >
                        { this._renderTenants() }
                    </Select>
                    <Button
                        onClick={() => window.location.href = '/logout'}
                        color="contrast" title={currentUser.displayName}>
                        <Avatar alt="Remy Sharp" src={currentUser.photo} />
                        <Typography color="inherit" className={classes.logoutText}>
                            Logout
                        </Typography>
                    </Button>
                </Toolbar>
            </AppBar>);
    }
}

interface OuterProps {
    onTenantChanged: (site: string) => void;
}

interface StyleProps extends WithStyles<keyof typeof styles> {}

interface Props extends StyleProps, UserProps, WithTenantProps, OuterProps { }

const WithStylesComponent = withStyles(styles)<UserProps>(Header);

const WithUserComponent = withUser<WithTenantProps>(WithStylesComponent);

const WithTenantComponent = withTenant<OuterProps>(WithUserComponent);

export default WithTenantComponent;
