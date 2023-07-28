import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, isAuthenticated, ...rest }) => {
    return (
        <Route
            {...rest}
            render={(props) =>
                isAuthenticated ? (
                    <Component {...props} />
                ) : (
                    <Navigate to="/signIn" />
                )
            }
        />
    );
    //return isAuthenticated ? (<Route {...rest} component={Component}/>) : (<Navigate to="/signIn"/>)

};



export default ProtectedRoute;