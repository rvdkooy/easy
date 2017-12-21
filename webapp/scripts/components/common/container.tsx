import * as React from 'react';
import { withStyles, WithStyles } from 'material-ui/styles';

const styles = {
    container: {
        marginTop: 24,
        marginBottom: 24
    }
};

const Container = (props: Props) => {
    return (
        <div className={props.classes.container}>
            { props.children }
        </div>);
};

interface Props extends WithStyles<keyof typeof styles> {
    children: JSX.Element | JSX.Element[]
}

export default withStyles(styles)<{ children: JSX.Element | JSX.Element[] }>(Container);