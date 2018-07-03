import { Typography } from '@material-ui/core';
import * as React from 'react';
import { getLogs, LogItem } from '../logging/logsApi';
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
                <Typography variant="headline">Logs</Typography>
                <LogsTable logs={ this.state.logs } />
            </div>
        );
    }
}
interface State {
    logs: LogItem[];
}

export default LogsWidget;
