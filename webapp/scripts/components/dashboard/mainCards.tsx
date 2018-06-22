import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import CardItem from './card';
import Button from '@material-ui/core/Button';
import { Theme, withTheme } from '@material-ui/core/styles';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';

const styles = (theme: Theme) => ({
    cardContainer: {
        marginTop: 16,
        marginBottom: 16,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    } as React.CSSProperties
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
                        href="/contentpages"
                        image="/contentpages" />
                    <CardItem
                        title="Theme"
                        description="this is where you can manage your website theme"
                        href="/theme"
                        image="/contentpages" />
                    <CardItem
                        title="Users"
                        description="This is where you can manage your users"
                        href="/users"
                        image="/test" />
                </div>
            </div>
        );
    }
}

interface Props extends WithStyles<'cardContainer' | 'card' | 'media'> { }
export default withStyles(styles)<{}>(MainCards);