import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import './styles.css';
import Header from '../../components/Header';
import ClientList from '../../components/ClientList';
import Footer from "../../components/Footer";

import firebase from '../../utils/firebase-config';
import 'firebase/firestore';
import SweetAlert from 'react-bootstrap-sweetalert'



function Home() {

    const [search, setSearch] = useState([]);
    const [clientes, setClientes] = useState([]);
    const [filter, setFilter] = useState('');
    const [excluir, setExcluir] = useState('');
    const [confirmação, setConfirmação] = useState(false);
    const [confirmaçãoId, setConfirmaçãoId] = useState('');


    function deleteUser(id) {
        firebase.firestore().collection('clientes').doc(id).delete().then(() => {
            setExcluir(id);
            setConfirmação(false)
        })
    }

    function confirmeDeleteUser(id) {
        setConfirmaçãoId(id)
        setConfirmação(true)
    }

    useEffect(function () {
        let listaCli = [];

        firebase.firestore().collection('clientes').get().then(async function (resultado) {
            await resultado.docs.forEach(function (doc) {
                if (doc.data().nome.indexOf(search) >= 0) {
                    listaCli.push({
                        id: doc.id,
                        nome: doc.data().nome,
                        email: doc.data().email,
                        fone: doc.data().fone
                    });
                }
            })

            setClientes(listaCli);
        })
    }, [search, excluir]);



    return (
        <div>
            <Header />
            <div className='container-fluid title'>
                <h1 className='titulo'>Cadastro de clientes -{search}</h1>
                <div className='row search'>
                    <div className='col-4'>
                        <Link to='/app/newClient' className='btn btn-primary mb-3' type='button'><i className='fas fa-plus'></i> Cliente</Link>
                    </div>
                    <div className='col-8'>
                        <div className='input-group mb-3' >

                            <input onChange={(e) => setFilter(e.target.value)} type='text' className='form-control' placeholder='Pesquisar por nome' aria-describedby='button-addon2' />
                            <button onClick={(e) => setSearch(filter)} className='btn btn-primary' type='button' id='button-addon2'><i className='fa fa-search'></i> Pesquisar</button>
                        </div>
                    </div>
                </div>
            </div>
            <ClientList arrayClientes={clientes} clickDelete={confirmeDeleteUser} />

            {
                confirmação ?
                    <SweetAlert
                        warning
                        showCancel
                        showCloseButton
                        confirmBtnText="Sim"
                        confirmBtnBsStyle="danger"
                        cancelBtnText="Não"
                        cancelBtnBsStyle="light"
                        title="Apagar Usuário"
                        onConfirm={() => deleteUser(confirmaçãoId)}
                        onCancel={() => setConfirmação(false)}
                        reverseButtons={true}
                    >
                        Deseja excluir o cliente selecionado?
                    </SweetAlert> : null
            }
            <Footer />
        </div>
    )
}

export default Home;