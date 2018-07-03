import { Chip, Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
import { amber, blue, red } from '@material-ui/core/colors';
import { createStyles, withStyles, WithStyles } from '@material-ui/core/styles';
import * as React from 'react';
import { LogItem } from './logsApi';

const styles = createStyles({
    logsTable: {
        tableLayout: 'fixed',
    },
    whenColumn: {
        width: 120,
    },
    levelColumn: {
        width: 50,
    },
    messageColumn: {
        width: 'auto',
    },
    info: {
        backgroundColor: blue.A100,
    },
    warning: {
        backgroundColor: amber.A100,
    },
    error: {
        backgroundColor: red.A100,
    },
});

const LogsTable = (props: Props) => {
    const { classes } = props;
    const _getLevelClass = (level: string) => {
        switch (level) {
            case 'info':
                return classes.info;
            case 'warning':
                return classes.warning;
            case 'error':
                return classes.error;
            default:
                return classes.info;
        }
    };

    return (
        <Table className={classes.logsTable}>
            <TableHead>
                <TableRow>
                    <TableCell className={classes.levelColumn}>Level</TableCell>
                    <TableCell className={classes.whenColumn}>When</TableCell>
                    <TableCell className={classes.messageColumn}>Message</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {props.logs.map((l: LogItem) => {
                    return (
                        <TableRow key={l.id}>
                            <TableCell>
                                <Chip label={l.level} className={_getLevelClass(l.level)} />
                            </TableCell>
                            <TableCell>{l.timestamp}</TableCell>
                            <TableCell>{l.message}</TableCell>
                        </TableRow>
                    );
                })}
            </TableBody>
        </Table>
    );
};

interface Props extends WithStyles<keyof typeof styles> {
    logs: LogItem[];
}

export default withStyles(styles)<{ logs: LogItem[] }>(LogsTable);
