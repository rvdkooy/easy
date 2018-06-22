import { Typography } from '@material-ui/core';
import * as React from 'react';
import Container from '../common/container';
import PaddedPaper from '../common/paddedPaper';
import LogsWidget from './logsWidget';
import MainCards from './mainCards';

const DashBoard = () => {
    return (
        <PaddedPaper>
            <Typography variant="headline">DashBoard</Typography>
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
