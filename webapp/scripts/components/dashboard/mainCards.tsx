import * as React from 'react';
import Typography from 'material-ui/Typography';
import { Link } from 'react-router-dom';
import Card, { CardMedia, CardContent, CardActions } from 'material-ui/Card';
import Button from 'material-ui/Button';
import { Theme, withTheme } from 'material-ui/styles';
import withStyles, { WithStyles } from 'material-ui/styles/withStyles';

const styles = (theme: Theme) => ({
    cardContainer: {
        marginTop: 16,
        marginBottom: 16,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    } as React.CSSProperties,
    card: {
        flex: '0 1 49%',
    } as React.CSSProperties,
    media: {
        height: 125,
    },
});

class MainCards extends React.Component<Props> {
    render() {
        const { classes } = this.props;

        return (
            <div>
                <Typography type="headline">DashBoard</Typography>
                <div className={classes.cardContainer}>
                    <Card className={classes.card}>
                        <CardMedia
                            className={classes.media}
                            image="/public/images/hawaii-surfer.jpg"
                            title="Contemplative Reptile"
                        />
                        <CardContent>
                            <Typography type="headline" component="h2">
                                Events
                        </Typography>
                            <Typography component="p">
                                Events can be managed from here, after that we can connect to the event from the scoresystem and record livescores and other relevant information about it.
                        </Typography>
                        </CardContent>
                        <CardActions>
                            <Button 
                                component={({ ...props }) => <Link to="/events" { ...props } />}                                
                                dense color="primary">
                                Show events
                        </Button>
                        </CardActions>
                    </Card>

                    <Card className={classes.card}>
                        <CardMedia
                            className={classes.media}
                            image="/public/images/authentication.jpg"
                            title="Contemplative Reptile"
                        />
                        <CardContent>
                            <Typography type="headline" component="h2">
                                Users
                        </Typography>
                            <Typography component="p">
                                Users can be added by their social network email addresses, therefor we never have to store anyones password.
                        </Typography>
                        </CardContent>
                        <CardActions>
                            <Button 
                                component={({ ...props }) => <Link to="/users" { ...props } />} 
                                dense color="primary">
                                Show users
                        </Button>
                        </CardActions>
                    </Card>
                </div>
            </div>
        );
    }   
}

interface Props extends WithStyles<'cardContainer' | 'card' | 'media'> { }
export default withStyles(styles)<{}>(MainCards);