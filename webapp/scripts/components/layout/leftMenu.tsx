import BusinessIcon from 'material-ui-icons/Business';
import CloudIcon from 'material-ui-icons/Cloud';
import ExpandLess from 'material-ui-icons/ExpandLess';
import ExpandMore from 'material-ui-icons/ExpandMore';
import FileUploadIcon from 'material-ui-icons/FileUpload';
import HomeIcon from 'material-ui-icons/Home';
import ListIcon from 'material-ui-icons/List';
import SecurityIcon from 'material-ui-icons/Security';
import SettingsIcon from 'material-ui-icons/Settings';
import StarIcon from 'material-ui-icons/Star';
import TocIcon from 'material-ui-icons/Toc';
import WebIcon from 'material-ui-icons/Web';
import Avatar from 'material-ui/Avatar';
import Divider from 'material-ui/Divider';
import Drawer from 'material-ui/Drawer';
import List, { ListItem, ListItemIcon, ListItemText, ListSubheader } from 'material-ui/List';
import { Theme, WithStyles, withStyles } from 'material-ui/styles';
import Collapse from 'material-ui/transitions/Collapse';
import Typography from 'material-ui/Typography';
import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import { UserProps, withUser } from '../../services/userProvider';

const styles = (theme: Theme) => ({
    menu: {
        width: 250,
    },
    avatar: {
        padding: 16,
    },
    drawerPaper: {
        position: 'relative',
        height: '100%',
        width: 240,
    } as React.CSSProperties,
    nested: {
        paddingLeft: theme.spacing.unit * 4,
    },
});

class LeftMenu extends React.Component<AllProps, State> {
    state: State = {
        contentOpen: false,
    };

    _renderItem = (text: string, url: string, Icon: JSX.Element, className: string) => {
        return (
            <ListItem button onClick={() => this.props.history.push(url)} className={className}>
                <ListItemIcon>
                    {Icon}
                </ListItemIcon>
                <ListItemText primary={text} />
            </ListItem>
        );
    }
    _renderContentItem = (text: string, url: string, Icon: JSX.Element, className: string) => {
        return (
            <ListItem button onClick={this._toggleContentItem} className={className}>
                <ListItemIcon>
                    {Icon}
                </ListItemIcon>
                <ListItemText primary={text} />
                {this.state.contentOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
        );
    }

    _toggleContentItem = () => {
        this.setState({ contentOpen: !this.state.contentOpen });
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
                type="permanent"
            >
                <div className={classes.menu}>
                    <div className={classes.avatar}>
                        <Avatar src={currentUser.photo} />
                        <Typography>{currentUser.displayName}</Typography>
                    </div>
                    <Divider />
                    <List>
                        <ListSubheader component="div">Main</ListSubheader>
                        <ListItem component={(args) => this._renderItem(
                            'Home',
                            '/admin',
                            <HomeIcon />,
                            args.className)}
                        />
                        <ListItem component={(args) => this._renderContentItem(
                            'Content',
                            '/admin/content',
                            <CloudIcon />,
                            args.className)}
                        />
                        <Collapse component="li" in={this.state.contentOpen} timeout="auto" unmountOnExit>
                            <List disablePadding>
                                <ListItem component={(args) => this._renderItem(
                                    'Content Pages',
                                    '/admin/contentpages',
                                    <WebIcon />,
                                    classes.nested )}
                                />
                                <ListItem component={(args) => this._renderItem(
                                    'Files',
                                    '/admin/files',
                                    <FileUploadIcon />,
                                    classes.nested)}
                                />
                                <ListItem component={(args) => this._renderItem(
                                    'Menu\'s',
                                    '/admin/menus',
                                    <TocIcon />,
                                    classes.nested)} />
                            </List>
                        </Collapse>
                        <ListItem component={(args) => this._renderItem(
                            'Theme',
                            '/admin/theme',
                            <StarIcon />,
                            args.className)}
                        />
                        <ListItem component={(args) => this._renderItem(
                            'Settings',
                            '/admin/settings',
                            <SettingsIcon />,
                            args.className)}
                        />
                        <Divider />
                        <ListSubheader component="div">Advanced</ListSubheader>
                        <ListItem component={(args) => this._renderItem(
                            'Users',
                            '/admin/users',
                            <SecurityIcon />,
                            args.className)}
                        />
                        <ListItem component={(args) => this._renderItem(
                            'Logs',
                            '/admin/logs',
                            <ListIcon />,
                            args.className)}
                        />
                        <ListItem component={(args) => this._renderItem(
                            'Tenants',
                            '/admin/tenants',
                             <BusinessIcon />,
                             args.className)}
                            />
                    </List>
                </div>
            </Drawer>
        );
    }
}

interface State {
    contentOpen: boolean;
}

interface OuterProps extends RouteComponentProps<any> {
    open: boolean;
}

interface StyleProps extends WithStyles<'menu' | 'avatar' | 'nested' | 'drawerPaper'> { }
interface RouterProps extends RouteComponentProps<any> { }
interface AllProps extends OuterProps, StyleProps, RouterProps, UserProps { }

const WithStylesComponent = withStyles(styles)<UserProps>(LeftMenu);
const WithUserComponent = withUser<RouteComponentProps<any> & OuterProps>(WithStylesComponent);

export default withRouter<OuterProps>(WithUserComponent);
