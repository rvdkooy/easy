import Button from '@material-ui/core/Button';
import Card, { CardActions, CardContent, CardMedia } from '@material-ui/core/Card';
import { Theme, withTheme } from '@material-ui/core/styles';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
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
