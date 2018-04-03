import * as PropTypes from 'prop-types';
import * as React from 'react';
import { User } from './userService';

export class CurrentUserProvider extends React.Component<UserProviderProps> {

    static childContextTypes = {
        currentUser: PropTypes.object.isRequired,
    };

    getChildContext() {
        return { currentUser: this.props.currentUser };
    }

    render() {
        return this.props.children;
    }
}

export function withUser<P>(Component: React.ComponentClass<UserProps> | React.ComponentType<UserProps>):
    React.ComponentClass<P> {
    // tslint:disable-next-line
    class WithUser extends React.Component<UserProps & P> {

        static contextTypes = {
            currentUser: PropTypes.object.isRequired,
        };

        render() {
            return (<Component currentUser={ this.context.currentUser } { ...this.props } />);
        }
    }

    return WithUser;
}

export interface UserProps {
    currentUser: User;
}

interface UserProviderProps {
    children: JSX.Element;
    currentUser: User;
}
