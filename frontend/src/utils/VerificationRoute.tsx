import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../context/AuthContext';

const Verification = ({Component}: any) => {
    const { user } = useContext(AuthContext)

    if (user && !user.verified) {
        return <Component />
    } else {
        return <Navigate to="/setup-account" />
    }
}

export default Verification;