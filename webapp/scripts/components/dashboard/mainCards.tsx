import { createStyles } from '@material-ui/core/styles';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import * as React from 'react';
import CardItem from './card';

const styles = createStyles({
    cardContainer: {
        marginTop: 16,
        marginBottom: 16,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});

class MainCards extends React.Component<Props> {
    render() {
        const { classes } = this.props;

        return (
            <div>
                <div className={classes.cardContainer}>
                    <CardItem
                        title="Content Pages"
                        description="this is where you can manage your content"
                        href="/admin/contentpages"
                        image="/contentpages" />
                    <CardItem
                        title="Theme"
                        description="this is where you can manage your website theme"
                        href="/admin/theme"
                        image="/contentpages" />
                    <CardItem
                        title="Users"
                        description="This is where you can manage your users"
                        href="/admin/users"
                        image="/test" />
                </div>
            </div>
        );
    }
}

interface Props extends WithStyles<'cardContainer' | 'card' | 'media'> { }
export default withStyles(styles)<{}>(MainCards);
