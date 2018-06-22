import { Button, Card, CardActions, CardContent,
    CardMedia, Typography } from '@material-ui/core';
import { createStyles,withStyles, WithStyles } from '@material-ui/core/styles';
import * as React from 'react';
import { Link } from 'react-router-dom';

const styles = createStyles({
    card: {
        flex: '0 1 30%',
    },
    media: {
        height: 125,
    },
});

const CardItem = (props: Props) => {
    const ButtonComponent = ({...inner}) => {
        return <Link to={ props.href } {...inner} />;
    };

    return (
        <Card className={props.classes.card}>
            <CardMedia
                className={props.classes.media}
                image={ props.image }
                title=""
            />
            <CardContent>
                <Typography variant="headline" component="h2">
                    { props.title }
                </Typography>
                <Typography component="p">
                    { props.description }
                </Typography>
            </CardContent>
            <CardActions>
                <Button
                    component={ButtonComponent}
                    color="primary">
                    { `Go to ${props.title}` }
                </Button>
            </CardActions>
        </Card>
    );
};

interface Props extends WithStyles<'card' | 'media'>, OuterProps { }
interface OuterProps {
    title: string;
    description: string;
    href: string;
    image: string;
}

export default withStyles(styles)<OuterProps>(CardItem);
