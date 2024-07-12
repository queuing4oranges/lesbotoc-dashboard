import React, { useState, useContext } from 'react';
import { Button, InputGroup, Input, Row, Col, ListGroup, ListGroupItem } from 'reactstrap';
import { AdminContext } from '../../AdminContextProvider';

export default function Searchbar({ setEditContactModal }) {
	const [filteredData, setFilteredData] = useState([]);
	const [nameInput, setNameInput] = useState([]);
	
	const { contacts, setSelectedContact } = useContext(AdminContext);

	const handleFilter = (event) => {
		const searchName = event.target.value;
		setNameInput(searchName);

	const newFilter = contacts.filter((value) => {
		return value.name.toLowerCase().includes(searchName.toLowerCase());
		});
		
		if (searchName === '') {
			setFilteredData([]);
		} else {
			setFilteredData(newFilter);
		}
	};

	const clearInput = () => {
		setFilteredData([]);
		setNameInput('');
	};

	return (
		<Row className='d-flex justify-content-center py-4'>
			<Col md='6' className='position-relative'>
				<InputGroup>
					<Input
						type='text'
						placeholder='Search...'
						aria-label='Search'
						value={nameInput}
						onChange={handleFilter}
					/>
					<Button
						color='warning'
						type='button'
						onClick={filteredData.length === 0 ? null : clearInput}				
					>
						{(filteredData.length === 0) ? <i className='bi bi-search' /> : <i className='bi bi-x-lg' />}
					</Button>
				</InputGroup>
				
				{filteredData.length !== 0 && (
					<ListGroup 
						className='position-absolute z-3 border overflow-y-auto' 
						style={{ maxHeight: '300px', width: '96%'}}>
						{filteredData.map((contact, key) => {
							return (
								<ListGroupItem key={key} className='d-flex justify-content-between p-2 bg-secondary text-white'>
									{contact.name}
									<Button
										outline
										color='info'
										onClick={() => {
											setSelectedContact(contact);
											setEditContactModal(true);
										}}
									>
										<i className='bi bi-pencil' />
									</Button>
								</ListGroupItem>
							);
						})}
					</ListGroup>
				)}
			</Col>
		</Row>
	);
}
