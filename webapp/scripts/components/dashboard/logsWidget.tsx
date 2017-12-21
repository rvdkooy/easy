import * as React from 'react';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import { WithStyles, withStyles } from 'material-ui/styles';
import { Theme } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import LogsTable from '../logs/logsTable';
import { getLogs, LogItem } from '../logs/logsService';


class LogsWidget extends React.Component<undefined, State> {

    state: State = {
        logs: []
    };

    componentDidMount() {
        setTimeout(() => {
            getLogs(10).then(logs => {
                this.setState({ logs })
            });
        }, 250)
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
    logs: LogItem[]
}

export default LogsWidget;
