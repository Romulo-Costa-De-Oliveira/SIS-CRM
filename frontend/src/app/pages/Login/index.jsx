import React, { useState, useContext } from 'react';
import { Link, Navigate } from 'react-router-dom';
import './styles.css';
import { AuthContext } from '../../Context/auth';

import firebase from '../../utils/firebase-config';
import 'firebase/auth';

function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [success, setSuccess] = useState('');
    const { setLogged } = useContext(AuthContext);

    function loginUser() {
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(function (firebaseUser) {
                localStorage.setItem('logged','S')
                setLogged(true)
                setSuccess('S');
            })
            .catch(function (error) {
                localStorage.setItem('logged','N')

                setLogged(false);
                setSuccess('N');
            });
    }

    function changeEmail(event) {
        setEmail(event.target.value)
    }

    function changePassword(event) {
        setPassword(event.target.value)
    }

    return <div className="d-flex align-items-center text-center form-container">
        <form className="form-signin">
            <img className="mb-4" src="Images/logo-small2.png" alt="" />
            <h1 className="h3 mb-3 fw-normal">Login</h1>



            <div className="form-floating">
                <input onChange={changeEmail} type="email" className="form-control" id="floatingInput" placeholder="E-mail" />
                <label htmlFor="floatingInput">E-mail</label>
            </div>

            <div className="form-floating">
                <input onChange={changePassword} type="password" className="form-control" id="floatingPassword" placeholder="Senha" />
                <label htmlFor="floatingPassword">Senha</label>
            </div>

            <button onClick={loginUser} className="w-100 btn btn-lg btn-primary" type="button" >Acessar</button>

            {success === 'N' ?
                <div className="alert alert-danger mt-2" role="alert">E-mail ou senha inválida.</div>
                : null
            }
            {success === 'S' ? <Navigate to="/app/home" /> : null}

            <div className="login-links mt-5">
                <Link to="/app/resetpassword" className="mx-3">Esqueci minha senha</Link>
                <Link to="/app/newacount" className="mx-3">Criar nova conta</Link>

            </div>

            <p className="mt-5 mb-3 text-muted">&copy; Desenvolvido por Rabolinha Coders</p>
        </form>
    </div>
}

export default Login;