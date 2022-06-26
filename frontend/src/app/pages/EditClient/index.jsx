import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import { Link, Navigate, useParams } from 'react-router-dom';

import './styles.css';

import firebase from '../../utils/firebase-config'
import 'firebase/firestore';


function EditClient(props) {

    const { id } = useParams()
    const [newNome, setNewNome] = useState('')
    const [newEmail, setNewEmail] = useState('')
    const [newFone, setNewFone] = useState('')
    const db = firebase.firestore();
    const [message, setMessage] = useState('')
    const [success, setSuccess] = useState('')

    useEffect(() => {
        firebase.firestore().collection('clientes').doc(id).get().then((result) => {
            setNewNome(result.data().nome);
            setNewEmail(result.data().email);
            setNewFone(result.data().fone);
        })
    }, [])

    function updateUser() {
        if (newNome.length === 0) {
            setMessage('Informe o Nome')
        }
        else if (newEmail.length === 0) {
            setMessage('Informe o E-mail')
        }
        else if (newFone.length === 0) {
            setMessage('Informe o Telefone')
        }
        else {
            db.collection('clientes').doc(id).update({
                nome: newNome,
                email: newEmail,
                fone: newFone
            }).then(() => {
                setMessage('');
                setSuccess('S')
            }).catch((error) => {
                setMessage(error.message);
                setSuccess('N')
            });
        }
    }

    return (
        <div>    <Header />
            <div className='container-fluid title'>
                <div className='offset-lg-3 col-lg-6'>
                    <h1 className='titulo'>Editar Cliente</h1>
                    <h1>{id}-{newNome}-{newEmail}-{newFone}</h1>
                    <form>
                        <div className='mb-3'>
                            <label htmlFor='' className=''>Código</label>
                            <input type='text' className='form-control' value={id} aria-describedby='mail' disabled />
                        </div>
                        <div className='mb-3'>
                            <label htmlFor='' className=''>Nome</label>
                            <input onChange={e => setNewNome(e.target.value)} value={newNome} type='text' className='form-control' aria-describedby='mail' />
                        </div>
                        <div className='mb-3'>
                            <label htmlFor='' className=''>E-mail</label>
                            <input onChange={e => setNewEmail(e.target.value)} value={newEmail} type='email' className='form-control' aria-describedby='mail' />
                        </div>
                        <div className='mb-3'>
                            <label htmlFor='' className=''>Fone</label>
                            <input onChange={e => setNewFone(e.target.value)} value={newFone} type='text' className='form-control' aria-describedby='mail' />
                        </div>
                        <div className='text-center'>
                            <Link to='/app/home' className='btn btn-outline-primary button-group'>Cancelar</Link>
                            <button onClick={updateUser} className='btn btn-primary button-group' type='button'>Salvar</button>
                        </div>
                        {message.length > 0 ?
                            <div className="alert alert-danger mt-2" role="alert">{message}</div>
                            : null
                        }
                        {success === 'S' ? <Navigate to="/app/home" /> : null}
                    </form>
                </div>
            </div>
        </div>
    )
}
export default EditClient;