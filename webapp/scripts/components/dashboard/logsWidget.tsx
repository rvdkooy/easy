import { WithStyles, withStyles } from '@material-ui/core/styles';
import { Theme } from '@material-ui/core/styles';
import Table, { TableBody, TableCell, TableHead, TableRow } from '@material-ui/core/Table';
import Typography from '@material-ui/core/Typography';
import * as React from 'react';
import { getLogs, LogItem } from '../logging/logsService';
import LogsTable from '../logging/logsTable';

class LogsWidget extends React.Component<undefined, State> {

    state: State = {
        logs: [],
    };

    componentDidMount() {
        setTimeout(() => {
            getLogs(10).then((logs) => {
                this.setState({ logs });
            });
        }, 250);
    }

    render() {
        return (
            <div>
                <Typography type="headline">Logs</Typography>
                <LogsTable logs={ this.state.logs } />
            </div>
        );
    }
}
interface State {
    logs: LogItem[];
}

export default LogsWidget;
