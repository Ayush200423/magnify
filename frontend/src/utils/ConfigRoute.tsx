import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { LoginContext } from '../context/LoginContext';
import AuthContext from '../context/AuthContext';

const Config = ({Component}: any) => {
    const { loginState } = useContext(LoginContext)
    const { user } = useContext(AuthContext)

    if (loginState && user && user.verified) {
        return <Component />
    } else {
        return <Navigate to="/products" />
    }
}

export default Config;