import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../context/AuthContext';

const Auth = ({Component}: any) => {
    const {user} = useContext(AuthContext)

    return user ? <Navigate to="/setup-account" /> : <Component />
}

export default Auth;