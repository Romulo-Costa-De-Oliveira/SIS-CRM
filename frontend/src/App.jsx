import React, { useContext } from 'react';
import { BrowserRouter, Route, Routes, Navigate, Outlet } from 'react-router-dom';
import Site from './site/Site';
import Login from './app/pages/Login';
import NewAcount from './app/pages/NewAcount';
import ResetPassword from './app/pages/ResetPassword';
import Home from './app/pages/Home';
import NewClient from './app/pages/NewClient';
import EditClient from './app/pages/EditClient';
import { AuthContext } from './app/Context/auth';



function App() {
    const { logged } = useContext(AuthContext)

    function SecureRoute({ ...rest }) {
        if (!logged) {
            return <Navigate to="/app" />
        }
        else {
            return <Outlet />
        }
    }

    return <BrowserRouter>

        <Routes>

            <Route path="/" element={<Site />} />
            <Route path="/app" element={<Login />} />
            <Route path="/app/newacount" element={<NewAcount />} />
            <Route path="/app/resetpassword" element={<ResetPassword />} />
            <Route path='/' element={<SecureRoute />} >
                <Route path="/app/home" element={<Home />} />
                <Route path="/app/newclient" element={<NewClient />} />
                <Route path="/app/editClient/:id" element={<EditClient />} />
            </Route>
        </Routes>

    </BrowserRouter>

}
export default App;