import * as React from 'react';
import Typography from 'material-ui/Typography';
import Card, { CardMedia, CardContent, CardActions } from 'material-ui/Card';
import Button from 'material-ui/Button';
import { Theme, withTheme } from 'material-ui/styles';
import withStyles, { WithStyles } from 'material-ui/styles/withStyles';
import PaddedPaper from '../common/paddedPaper';
import MainCards from './mainCards';
import LogsWidget from './logsWidget';
import Container from '../common/container';

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
}

export default DashBoard;