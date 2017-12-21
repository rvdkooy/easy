import * as React from 'react';
import { History } from 'history';
import { withRouter, RouteComponentProps } from 'react-router';
import { withUser, UserProps } from '../../services/userProvider';
import withStyles, { WithStyles } from 'material-ui/styles/withStyles';
import { Link } from 'react-router-dom';
import Drawer from 'material-ui/Drawer';
import Divider from 'material-ui/Divider';
import List, { ListItem, ListItemText, ListItemIcon } from 'material-ui/List';
import HomeIcon from 'material-ui-icons/Home';
import EventIcon from 'material-ui-icons/Event';
import ListIcon from 'material-ui-icons/List';
import SecurityIcon from 'material-ui-icons/Security';
import Avatar from 'material-ui/Avatar';
import Typography from 'material-ui/Typography';

const styles = {
    menu: {
        width: 250
    },
    avatar: {
        padding: 16
    },
    drawerPaper: {
        position: 'relative',
        height: '100%',
        width: 240,
    } as React.CSSProperties,
};

class LeftMenu extends React.Component<AllProps> {
    _renderItem = (text: string, url: string, Icon: JSX.Element, className: string) => {
        return (
            <ListItem button onClick={() => this.props.history.push(url)}>
                <ListItemIcon>
                    {Icon}
                </ListItemIcon>
                <ListItemText primary={text} />
            </ListItem>
        );
    }

    render() {
        const { classes, currentUser } = this.props;
        
        return (
            <Drawer
                classes={{
                    paper: classes.drawerPaper,
                }}
                anchor="left"
                open={this.props.open}
                onClose={this.props.onClose}
                type="permanent"
            >
                <div className={classes.menu}>
                    <div className={classes.avatar}>
                        <Avatar src={currentUser.photo} />
                        <Typography>{ currentUser.displayName }</Typography>
                    </div>
                    <Divider />
                    <List>
                        <ListItem component={(args) => this._renderItem('Home', '/', <HomeIcon />, args.className)} />
                        <ListItem component={(args) => this._renderItem('Users', '/users', <SecurityIcon />, args.className)} />
                        <ListItem component={(args) => this._renderItem('Logs', '/logs', <ListIcon />, args.className)} />
                    </List>
                </div>
            </Drawer>
        );
    }
};

interface OuterProps extends RouteComponentProps<any> {
    open: boolean,
    onClose: () => void
}

interface StyleProps extends WithStyles<keyof typeof styles> { }
interface RouterProps extends RouteComponentProps<any> { }
interface AllProps extends OuterProps, StyleProps, RouterProps, UserProps { }

const WithStylesComponent = withStyles(styles)<UserProps>(LeftMenu)
const WithUserComponent = withUser<RouteComponentProps<any> & OuterProps>(WithStylesComponent)

export default withRouter<OuterProps>(WithUserComponent);
