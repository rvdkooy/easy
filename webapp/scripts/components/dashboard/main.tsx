import { Typography } from '@material-ui/core';
import * as React from 'react';
import { withTenant, WithTenantProps } from '../../services/withTenant';
import { BreadCrumbs } from '../common';
import Container from '../common/container';
import PaddedPaper from '../common/paddedPaper';
import LogsWidget from './logsWidget';
import MainCards from './mainCards';

const DashBoard = (props: WithTenantProps) => {
    return (
        <div>
            <BreadCrumbs
                rootItemText={props.selectedTenant.site}
                items={[]}
            />
            <PaddedPaper>
                <Typography variant="headline">DashBoard</Typography>
                <Container>
                    <MainCards />
                </Container>

                <Container>
                    <LogsWidget />
                </Container>
            </PaddedPaper>
        </div>
    );
};

export default withTenant(DashBoard);
