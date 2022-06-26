import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import './styles.css';

import firebase from '../../utils/firebase-config';
import 'firebase/auth';

function NewAcount() {
    const [registerEmail, setRegisterEmail] = useState('');
    const [registerPassword, setRegisterPassword] = useState('');
    const [message, setMessage] = useState('');
    const [success, setSuccess] = useState('');


    const createUser = async () => {
        setMessage('')
        if (!registerEmail || !registerPassword) {
            setMessage('Informe os campos corretamente.')
        }
        firebase.auth().createUserWithEmailAndPassword(registerEmail, registerPassword).then(resultado => {
            setSuccess('S')
        }).catch(error => {
            setSuccess('N')
            if (error.message === 'Firebase: Error (auth/email-already-in-use).') {
                setMessage('Email já está cadastrado em outra conta.')
            } else if (error.message === 'Firebase: Error (auth/invalid-email).') {
                setMessage('Email inválido.')
            } else if (error.message === 'Firebase: Password should be at least 6 characters (auth/weak-password).') {
                setMessage('A senha deve conter no mínimo 6 caracteres.')
            } else
                setMessage('Erro ao criar conta.' + error.message)

        });
    }

    function changeRegisterEmail(event) {
        setRegisterEmail(event.target.value)
    }

    function changeRegisterPassword(event) {
        setRegisterPassword(event.target.value)
    }
    return <div className="d-flex align-items-center text-center form-container">
        <form className="form-signin">
            <img className="mb-4" src="/Images/logo-small2.png" alt="" />
            <h1 className="h3 mb-3 fw-normal">Criar Conta</h1>
            <h1>{registerEmail}-{registerPassword}</h1>
            <div className="form-floating">
                <input onChange={changeRegisterEmail} type="email" className="form-control" id="floatingInput" placeholder="E-mail" />
                <label htmlFor="floatingInput">E-mail</label>
            </div>

            <div className="form-floating">
                <input onChange={changeRegisterPassword} type="password" className="form-control" id="floatingPassword" placeholder="Senha" />
                <label htmlFor="floatingPassword">Senha</label>
            </div>

            <button onClick={createUser} className="w-100 btn btn-lg btn-primary" type="button">Criar conta</button>

            {message.length > 0 ?
                <div className="alert alert-danger mt-2" role="alert">{message}</div>
                : null
            }
            {success === 'S' ? <Navigate to="/app/home" /> : null}

            <div className="login-links mt-5">

                <Link to="/app" className="mx-3">Já possuo uma conta</Link>
            </div>

            <p className="mt-5 mb-3 text-muted">&copy; Desenvolvido por Rabolinha Coders</p>
        </form>
    </div>
}

export default NewAcount;