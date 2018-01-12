import * as React from 'react';
import Typography from 'material-ui/Typography';

class ErrorBoundary extends React.Component {
    state: State = {
        hasError: false
    };

    componentDidCatch() {
        this.setState({ hasError: true });
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
    hasError: boolean
}

export default ErrorBoundary;