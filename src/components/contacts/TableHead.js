import React from 'react';

export default function TableHead() {
	return (
		<thead className='small'>
			<tr className='table-hr'>
				<th>Name</th>
				<th >Where from?</th>
				<th >Email</th>
				<th>Phone</th>
				<th >Newsletter</th>
				<th >Age</th>
				<th >Updated</th>
				<th className='d-flex justify-content-center'>Edit / Delete</th>
			</tr>
		</thead>
	);
}
