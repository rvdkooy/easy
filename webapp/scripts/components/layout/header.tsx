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

class Header extends React.Component<Props, State> {

    state: State = {
        tenants: [
            'www.vdkooy.com' ,
            'www.thijsvanderkooij.nl',
            'www.stefvanderkooij.nl',
            'www.sharpsolutions.nl',
        ],
        selectedTenant: 'www.vdkooy.com',
    };

    _renderTenants = () => {
        return this.state.tenants.map((t) => {
            return (<MenuItem key={t} value={t}>{ t }</MenuItem>);
        });
    }

    _onTenantChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ selectedTenant: e.target.value });
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
                        value={this.state.selectedTenant}
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

interface State {
    tenants: string[];
    selectedTenant: string;
}

interface StyleProps extends WithStyles<keyof typeof styles> {}
interface Props extends StyleProps, UserProps { test: boolean; }

const WithStylesComponent = withStyles(styles)<UserProps>(Header);

const WithUserComponent = withUser<{ }>(WithStylesComponent);

export default WithUserComponent;
