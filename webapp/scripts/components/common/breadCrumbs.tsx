import * as React from 'react';
import { Link } from 'react-router-dom';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import withStyles, { WithStyles } from 'material-ui/styles/withStyles';
import { Theme } from 'material-ui/styles';
import HomeIcon from 'material-ui-icons/Home';

const styles = (theme: Theme) => ({
    list: {
        height: 40
    },
    listItem: {
        float: 'left',
        paddingTop: 2,
        paddingRight: 0,
        paddingBottom: 2,
        paddingLeft: 0 
    },
    text: {
        paddingRight: 10,
    },
    textBold: {
        '& h3': {
            fontWeight: 'bold',
        },
        paddingRight: 10,
    } as React.CSSProperties
});

{/* <ListItemIcon>
    <HomeIcon />
</ListItemIcon> */}

const BreadCrumbs = (props: Props) => {
    
    const items = [(<ListItem key="home" className={props.classes.listItem}>
                        <Link to="/">
                        
                            <ListItemText className={props.classes.text} primary="Home" />
                        </Link>
                    </ListItem>)];
    
    props.items.forEach((item, index) => {
        items.push((<ListItem key={`arrow_${index}`} className={props.classes.listItem}>
                        <ListItemText className={props.classes.text} primary=">" />
                    </ListItem>));

        items.push((<ListItem key={`item_${index}`} className={props.classes.listItem}>
                        {
                            (item.url) ?
                                <Link to={item.url}>
                                    <ListItemText className={props.classes.text} primary={item.text} />
                                </Link> : <ListItemText className={props.classes.textBold} primary={item.text} />
                        }
                    </ListItem>));
    })
    
    return (
        <List className={props.classes.list} dense>
            { items }
        </List>
    );
};

interface Props extends WithStyles<'list' | 'listItem' | 'text' | 'textBold'> {
    items: Item[]
}

interface Item {
    text: string,
    url?: string
}

export default withStyles(styles)<{ items: Item[] }>(BreadCrumbs);