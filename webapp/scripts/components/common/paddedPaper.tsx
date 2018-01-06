import * as React from 'react';
import Paper from 'material-ui/Paper';
import { withStyles, WithStyles, Theme } from 'material-ui/styles';

const styles = (theme: Theme) => {
    return {
        root: theme.mixins.gutters({
            paddingTop: theme.spacing.unit * 2,
            paddingBottom: theme.spacing.unit * 2
        })
    }
};

const PaddedPaper = (props: Props) => {
    return (
        <Paper className={props.classes.root}>
            { props.children }
        </Paper>
    );
};

interface Props extends WithStyles<'root'> {
    children: any
}

export default withStyles(styles)<{}>(PaddedPaper);