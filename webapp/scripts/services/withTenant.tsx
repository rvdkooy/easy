import * as PropTypes from 'prop-types';
import * as React from 'react';
import { Tenant } from './userService';

export interface WithTenantProps {
    selectedTenant: Tenant;
}

export function withTenant<P>(Component: React.ComponentClass<WithTenantProps> |
                                       React.ComponentType<WithTenantProps>): React.ComponentClass<P> {

    class WithTenant extends React.Component<WithTenantProps & P> {

        static contextTypes = {
            selectedTenant: PropTypes.object.isRequired,
        };

        render() {
            return (<Component selectedTenant={ this.context.selectedTenant } { ...this.props } />);
        }
    }

    return WithTenant;
}
