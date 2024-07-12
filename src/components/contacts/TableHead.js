import React from 'react';

export default function TableHead() {
	return (
		<thead className='small'>
			<tr className='table-hr'>
				<th scope='col'>Name</th>
				<th scope='col' className='th-col'>Where from?</th>
				<th scope='col' className='th-col'>Email</th>
				<th scope='col'>Phone</th>
				<th scope='col' className='th-col'>Newsletter</th>
				<th scope='col' className='th-col'>Age</th>
				<th scope='col' className='th-col'>Updated</th>
				<th scope='col' className='th-col d-flex justify-content-center'>Edit / Delete</th>
			</tr>
		</thead>
	);
}
