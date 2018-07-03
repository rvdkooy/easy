import { Paper } from '@material-ui/core';
import { Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import * as React from 'react';

const styles = (theme: Theme) => {
    return {
        root: theme.mixins.gutters({
            paddingTop: theme.spacing.unit * 2,
            paddingBottom: theme.spacing.unit * 2,
        }),
    };
};

const PaddedPaper = (props: Props) => {
    return (
        <Paper className={props.classes.root}>
            { props.children }
        </Paper>
    );
};

interface Props extends WithStyles<'root'> {
    children: any;
}

export default withStyles(styles)<{}>(PaddedPaper);
