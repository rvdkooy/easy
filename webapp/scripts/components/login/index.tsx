import { Button, Paper, Typography } from '@material-ui/core';
import { Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import * as React from 'react';

const styles = (theme: Theme) => ({
    root: theme.mixins.gutters({
        paddingTop: 16,
        paddingBottom: 16,
        marginTop: theme.spacing.unit * 3,
    }),
});

const LoginPage = (props: Props) => {
    return (
        <Paper className={props.classes.root}>
            <Typography variant="headline" component="h3">
                Login
            </Typography>
                <Typography component="p">
                    You can login with your google account
            </Typography>
            <Button variant="raised" color="primary" href="/auth/google">
                Login
            </Button>
        </Paper>
    );
};

interface Props extends WithStyles<'root'> { }

export default withStyles(styles)<{}>(LoginPage);
