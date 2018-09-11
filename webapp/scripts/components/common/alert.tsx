import { Typography } from '@material-ui/core';
import { amber } from '@material-ui/core/colors';
import { createStyles, withStyles, WithStyles } from '@material-ui/core/styles';
import { Warning as WarningIcon } from '@material-ui/icons';
import * as React from 'react';

const styles = createStyles({
    warning: {
        color: amber.A700,
        marginRight: 16,
    },
    alert: {
        display: 'flex',
        alignItems: 'center',
    },
});

const Alert = (props: Props) => {
    const { alert, warning } = props.classes;

    return (
        <div className={alert}>
            <WarningIcon className={warning} />
            <Typography variant="subheading">
                { props.message }
            </Typography>
        </div>
    );
};

interface Props extends WithStyles<'warning' | 'alert'> {
    message: string;
}

export default withStyles(styles)(Alert);
