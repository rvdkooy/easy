import Typography from '@material-ui/core/Typography';
import * as React from 'react';
import { BreadCrumbs, PaddedPaper } from '../common';
import { getLogs, LogItem } from './logsService';
import LogsTable from './logsTable';

class LogsPage extends React.Component<undefined, State> {

    state: State = {
        logs: [],
    };

    componentDidMount() {
        getLogs(75).then((logs) => {
            this.setState({ logs });
        });
    }

    render() {
        const breadCrumbItems = [
            { text: 'Logs' },
        ];

        return (
            <div>
                <BreadCrumbs items={breadCrumbItems} />
                <PaddedPaper>
                    <Typography type="headline">Logs</Typography>

                    <LogsTable logs={this.state.logs} />
                </PaddedPaper>
            </div>);
    }
}

interface State {
    logs: LogItem[];
}

export default LogsPage;
