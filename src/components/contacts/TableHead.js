import React from 'react';

export default function TableHead() {
	return (
		<thead className='small'>
			<tr className='table-hr'>
				<th scope='col'>Name</th>
				<th scope='col' className='col-wherefrom'>Where from?</th>
				<th scope='col' className='col-email'>Email</th>
				<th scope='col'>Phone</th>
				<th scope='col' className='col-newsletter'>Newsletter</th>
				<th scope='col' className='col-age'>Age</th>
				<th scope='col' className='col-updated'>Updated</th>
				<th scope='col' className='col-edit d-flex justify-content-center'>Edit / Delete</th>
			</tr>
		</thead>
	);
}
