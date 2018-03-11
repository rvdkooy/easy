import Button from 'material-ui/Button';
import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card';
import { Theme, withTheme } from 'material-ui/styles';
import withStyles, { WithStyles } from 'material-ui/styles/withStyles';
import Typography from 'material-ui/Typography';
import * as React from 'react';
import Container from '../common/container';
import PaddedPaper from '../common/paddedPaper';
import LogsWidget from './logsWidget';
import MainCards from './mainCards';

const DashBoard = () => {
    return (
        <PaddedPaper>
            <Typography type="headline">DashBoard</Typography>
            <Container>
                <MainCards />
            </Container>

            <Container>
                <LogsWidget />
            </Container>
        </PaddedPaper>
    );
};

export default DashBoard;
