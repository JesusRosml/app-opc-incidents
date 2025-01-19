import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';

export const ProtectedRoute = ({ children, isAuth }) => {
    if ( !isAuth ) return <Navigate to='/' />;

    return children;
}

ProtectedRoute.propTypes = {
    children: PropTypes.node.isRequired,
    isAuth: PropTypes.bool.isRequired
}