import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import './styles.css';

import firebase from '../../utils/firebase-config';
import 'firebase/auth';

function ResetPassword() {

    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [success, setSuccess] = useState('');

    function recoverPassword() {
        setMessage('')
        if (!email) {
            setSuccess('')
            setMessage('Informe o email corretamente.')
        } else {
            firebase.auth().sendPasswordResetEmail(email).then(resultado => {
                setMessage('');
                setSuccess('Email enviado com sucesso');
            }).catch(erro => {
                setSuccess('');
                setMessage('Erro ao enviar email: ' + erro.message);
            })

        }
    }



    return <div className="d-flex align-items-center text-center form-container">
        <form className="form-signin">
            <img className="mb-4" src="/Images/logo-small2.png" alt="" />
            <h1 className="h3 mb-3 fw-normal">Recuperar Senha</h1>
            <h1>{email}</h1>
            <div className="form-floating">
                <input onChange={(e) => setEmail(e.target.value)} type="email" className="form-control" id="floatingInput" placeholder="E-mail" />
                <label htmlFor="floatingInput">E-mail</label>
            </div>

            <button onClick={recoverPassword} className="w-100 btn btn-lg btn-primary mt-3" type="button">Enviar</button>

            {message.length > 0 ?
                <div className="alert alert-danger mt-2" role="alert">{message}</div>
                : null
            }
            {success.length > 0 ?
                <div className="alert alert-success mt-2" role="alert">{success}</div>
                : null
            }

            <div className="login-links mt-5">
                <Link to="/app" className="mx-3">Login</Link>
                <Link to="/app/newacount" className="mx-3">Criar nova conta</Link>

            </div>

            <p className="mt-5 mb-3 text-muted">&copy; Desenvolvido por Rabolinha Coders</p>
        </form>
    </div>
}

export default ResetPassword;