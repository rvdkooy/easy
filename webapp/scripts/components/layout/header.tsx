import * as React from 'react';
import { Link } from 'react-router-dom';
import { withUser, UserProps } from '../../services/userProvider';
import LeftMenu from './leftMenu';
import withStyles, { WithStyles } from 'material-ui/styles/withStyles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import Avatar from 'material-ui/Avatar';

const styles = {
    flex: {
        flex: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
    logoutText: {
        marginLeft: 8
    }
};

{/* <IconButton
    className={classes.menuButton}
    color="contrast"
    aria-label="Menu"
    onClick={() => { }}
>
    <MenuIcon />
</IconButton> */}

class Header extends React.Component<Props> {

    render() {
        const { classes, currentUser } = this.props;

        return (
            <AppBar position="static">
                <Toolbar>

                    <Typography type="title" color="inherit" className={classes.flex}>
                        Easy admin system
                    </Typography>
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
};

interface StyleProps extends WithStyles<keyof typeof styles> {}
interface Props extends StyleProps, UserProps { test: boolean }

const WithStylesComponent = withStyles(styles)<UserProps>(Header);

const WithUserComponent = withUser<{ }>(WithStylesComponent);

export default WithUserComponent;
