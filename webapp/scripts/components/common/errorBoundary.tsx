import Typography from '@material-ui/core/Typography';
import * as React from 'react';

class ErrorBoundary extends React.Component {
    state: State = {
        hasError: false,
    };

    componentDidCatch(error: Error, info: any) {
        this.setState({ hasError: true });
        console.error(error, info);
    }

    render() {
        if (this.state.hasError) {
            return (
                <Typography>Oops an error occured....</Typography>
            );
        }

        return this.props.children;
    }
}

interface State {
    hasError: boolean;
}

export default ErrorBoundary;
