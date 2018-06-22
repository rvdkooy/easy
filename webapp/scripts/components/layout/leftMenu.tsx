import { Avatar, Collapse, Divider, Drawer, List, ListItem,
    ListItemIcon, ListItemText, ListSubheader, Typography } from '@material-ui/core';
import { StyleRulesCallback, Theme, WithStyles, withStyles } from '@material-ui/core/styles';
import { Business as BusinessIcon, Cloud as CloudIcon, ExpandLess, ExpandMore,
    FileUpload as FileUploadIcon, Home as HomeIcon, List as ListIcon,
    Security as SecurityIcon, Settings as SettingsIcon, Star as StarIcon,
    Toc as TocIcon, Web as WebIcon } from '@material-ui/icons';
import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import { UserProps, withUser } from '../../services/userProvider';

const styles: StyleRulesCallback<'menu' | 'avatar' | 'drawerPaper' | 'nested'> = (theme) => ({
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
    },
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
                variant="permanent"
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
