import * as React from 'react';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import { Theme, withStyles, WithStyles } from 'material-ui/styles';

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
            <Typography type="headline" component="h3">
                Login
            </Typography>
                <Typography component="p">
                    You can login with your google account
            </Typography>
            <Button raised color="primary" href="/auth/google">
                Login
            </Button>
        </Paper>
    );
};

interface Props extends WithStyles<'root'> { }

export default withStyles(styles)<{}>(LoginPage);