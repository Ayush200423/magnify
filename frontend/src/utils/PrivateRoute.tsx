import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../context/AuthContext';

const Private = ({Component}: any) => {
    const { user } = useContext(AuthContext)

    if (user && user.verified) {
        return <Component />
    } else if (user && !user.verified) {
        return <Navigate to="/verify" />
    } else {
        return <Navigate to="/login" />
    }
}

export default Private;