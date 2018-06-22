import { IconButton, Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
import { createStyles, withStyles, WithStyles } from '@material-ui/core/styles';
import { Delete as DeleteIcon } from '@material-ui/icons';
import * as React from 'react';
import { FileItem } from './filesService';

const styles = createStyles({
    filesTable: {
        tableLayout: 'fixed',
    },
    nameColumn: {
        width: 'auto',
    },
    modifiedColumn: {
        width: 'auto',
    },
    sizeColumn: {
        width: 50,
    },
    actions: {
        width: 25,
    },
});

const FilesTable = (props: Props) => {
    const { classes } = props;

    return (
        <Table className={classes.filesTable}>
            <TableHead>
                <TableRow>
                    <TableCell className={classes.nameColumn}>Name</TableCell>
                    <TableCell className={classes.modifiedColumn}>Last modified</TableCell>
                    <TableCell className={classes.sizeColumn}>Size</TableCell>
                    <TableCell className={classes.actions}></TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {props.files.map((f: FileItem) => {
                    return (
                        <TableRow key={f.key}>
                            <TableCell>{f.key}</TableCell>
                            <TableCell>{f.lastModified}</TableCell>
                            <TableCell>{f.size}</TableCell>
                            <TableCell>
                            <IconButton aria-label="Delete" onClick={props.onDeleteFile.bind(null, f.key)}>
                                <DeleteIcon />
                            </IconButton>
                            </TableCell>
                        </TableRow>
                    );
                })}
            </TableBody>
        </Table>
    );
};

interface OuterProps {
    files: FileItem[];
    onDeleteFile: (key: string) => void;
}

interface Props extends OuterProps, WithStyles<keyof typeof styles> {

}

export default withStyles(styles)<OuterProps>(FilesTable);
