import * as React from 'react';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Card, { CardMedia, CardContent, CardActions } from '@material-ui/core/Card';
import { Link } from 'react-router-dom';

const styles= {
    card: {
        flex: '0 1 30%',
    } as React.CSSProperties,
    media: {
        height: 125,
    }
}

const CardItem = (props: Props) => {
    const outerProps = props;
    return (
        <Card className={props.classes.card}>
            <CardMedia
                className={props.classes.media}
                image={ props.image }
                title=""
            />
            <CardContent>
                <Typography type="headline" component="h2">
                    { props.title }
                </Typography>
                <Typography component="p">
                    { props.description }
                </Typography>
            </CardContent>
            <CardActions>
                <Button
                    component={({ ...props }) => <Link to={ outerProps.href } { ...props } />}
                    dense color="primary">
                    { `Go to ${props.title}` }
                </Button>
            </CardActions>
        </Card>
    );
};

interface Props extends WithStyles<'card' | 'media'>, OuterProps { }
interface OuterProps {
    title: string,
    description: string,
    href: string,
    image: string
}

export default withStyles(styles)<OuterProps>(CardItem);