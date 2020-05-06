import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import TokenService from '../../services/token-service';

export default function PrivateRoute({ component, ...props }) {
    const Component = component;
    return (
        <Route
            {...props}
            render={componentProps => (
                TokenService.hasToken()
                    ? <Component {...componentProps} />
                    : <Redirect
                        to={{
                            pathname: '/',
                            state: { from: componentProps.location }
                        }}
                    />
            )}
        />
    )
}