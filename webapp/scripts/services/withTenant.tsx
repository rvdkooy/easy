import { Typography } from '@material-ui/core';
import * as PropTypes from 'prop-types';
import * as React from 'react';
import { PaddedPaper } from '../components/common';
import { Tenant } from './userService';

export interface WithTenantProps {
    selectedTenant: Tenant;
}

export function withTenant<P>(Component: React.ComponentClass<WithTenantProps> |
                                       React.ComponentType<WithTenantProps>): React.ComponentClass<P> {

    class WithTenant extends React.Component<WithTenantProps & P> {

        static contextTypes = {
            selectedTenant: PropTypes.object,
        };

        render() {
            if (!this.context.selectedTenant) {
                return (
                    <PaddedPaper>
                        <Typography variant="headline">No tenant selected, please select one!</Typography>
                    </PaddedPaper>
                );
            }

            return (<Component selectedTenant={ this.context.selectedTenant } { ...this.props } />);
        }
    }

    return WithTenant;
}
