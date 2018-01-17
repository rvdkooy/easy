import * as React from 'react';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';

import { CircularProgress } from 'material-ui/Progress';
import withStyles, { WithStyles } from 'material-ui/styles/withStyles';
import { FileItem } from './filesService';

const styles = {
    filesTable: {
        tableLayout: 'fixed'
    },
    nameColumn: {
        width: 'auto'
    },
    modifiedColumn: {
        width: 'auto'
    },
    sizeColumn: {
        width: 50
    }
};

const FilesTable = (props: Props) => {
    const { classes } = props;
    
    return (
        <Table className={classes.filesTable}>
            <TableHead>
                <TableRow>
                    <TableCell className={classes.nameColumn}>Name</TableCell>
                    <TableCell className={classes.modifiedColumn}>Last modified</TableCell>
                    <TableCell className={classes.sizeColumn}>Size</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {props.files.map((f: FileItem) => {
                    return (
                        <TableRow key={f.key}>
                            <TableCell>{f.key}</TableCell>
                            <TableCell>{f.lastModified}</TableCell>
                            <TableCell>{f.size}</TableCell>    
                        </TableRow>
                    );
                })}
            </TableBody>
        </Table>
    );
};

interface Props extends WithStyles<keyof typeof styles> {
    files: FileItem[]
}

export default withStyles(styles)<{ files: FileItem[] }>(FilesTable);