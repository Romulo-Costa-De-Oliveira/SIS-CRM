import React from "react";
import { Link } from 'react-router-dom'




function ClientList(props) {


	return (
		<table className="table table-bordered table-hover">
			<thead>
				<tr className="table-secondary">
					<th scope="col">Código</th>
					<th scope="col">Nome</th>
					<th scope="col">E-mail</th>
					<th scope="col">Telefone</th>
					<th scope="col" className='col-action'></th>
				</tr>
			</thead>
			<tbody>

				{
					props.arrayClientes.map((client) => {
						return (
							<tr key={client.id}>
								<th>{client.id}</th>
								<th>{client.nome}</th>
								<th>{client.email}</th>
								<th>{client.fone}</th>
								<th >
									<Link to={'/app/editClient/' + client.id}><i className="fas fa-edit action-icon"></i></Link>
									<Link to='#' onClick={() => props.clickDelete(client.id)}><i className="fas fa-trash-alt red action-icon"></i></Link>
								</th>
							</tr>
						)
					})
				}


			</tbody>
		</table>
	);
}
export default ClientList;