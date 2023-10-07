import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import { Home, ProductSettings, AccountSettings } from './pages';
import { EditProduct } from './pages/Dashboard/EditProduct';
import { CreateProduct } from './pages/Dashboard/CreateProduct';
import { ProductContextProvider } from './context/ProductContext';
import { AuthContextProvider } from './context/AuthContext';
import { LoginContextProvider } from './context/LoginContext';
import { VerifyContextProvider } from './context/VerifyContext';
import { SetupContextProvider } from './context/SetupContext';
import { AccountContextProvider } from './context/AccountContext';
import Private from './utils/PrivateRoute';
import Verification from './utils/VerificationRoute';
import Auth from './utils/AuthRoute';
import Config from './utils/ConfigRoute';
import { Login } from './pages/Auth/Login';
import { Register } from './pages/Auth/Registration/Register';
import { ForgotPassword } from './pages/Auth/ForgotPassword';
import { ChangePassword } from './pages/Auth/ChangePassword';
import { VerifyEmail } from './pages/Auth/Registration/VerifyEmail'
import { AccountSetup } from './pages/Auth/Registration/AccountSetup';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="App">
      <AuthContextProvider>
        <LoginContextProvider>
          <SetupContextProvider>
            <VerifyContextProvider>
              <Routes>
                <Route path='/' element={<Home />} />
                <Route path='login' element={<Auth Component={Login} />} />
                <Route path='register' element={<Auth Component={Register} />} />
                <Route path='reset-password' element={<Auth Component={ForgotPassword} />} />
                <Route path='reset-password/:id' element={<Auth Component={ChangePassword} />} />
                <Route path='verify' element={<Verification Component={VerifyEmail} />} />
                <Route path='setup-account' element={<Config Component={AccountSetup} />} />
              </Routes>
            </VerifyContextProvider>
          
            <AccountContextProvider>
              <ProductContextProvider>
                <Routes>
                  <Route path='products'>
                    <Route path='' element={<Private Component={ProductSettings} />} />
                    <Route path='edit' element={<Private Component={EditProduct} />} />
                    <Route path='create' element={<Private Component={CreateProduct} />} />
                  </Route>
                </Routes>
              </ProductContextProvider>

              <Routes>
                <Route path='account' element={<Private Component={AccountSettings} />} />
              </Routes>
            </AccountContextProvider>
          </SetupContextProvider>
        </LoginContextProvider>
      </AuthContextProvider>
      
      <ToastContainer className='text-[13px]' autoClose={2000} />
    </div>
  );
}

export default App;