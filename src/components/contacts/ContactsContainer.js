import React, { useState, useEffect, useContext } from 'react';
import Moment from 'react-moment';
import swal from 'sweetalert';
import { toast } from 'react-toastify';
import { CSVLink } from 'react-csv';

import { Container, Row, Button, Col, Table } from 'reactstrap';

import apiClient from '../../api';
import { AdminContext } from '../../AdminContextProvider';
import AddModal from './AddModal';
import EditModal from './EditModal';
import Searchbar from './Searchbar';
import TableHead from './TableHead';
// import AdminNavbar from '../../includes/AdminNavbar';
// import ReportBug from '../../includes/ReportBug';

export default function ContactsContainer() {
	const [addContactModal, setAddContactModal] = useState(false);
	const [editContactModal, setEditContactModal] = useState(false);

	const toggleAddContactModal = () => setAddContactModal(!addContactModal);
	const toggleEditContactModal = () => setEditContactModal(!editContactModal);
	
	const {
		contacts, setContacts,
		success, setSuccess,
		selectedContact,setSelectedContact
	} = useContext(AdminContext);

	// Get contacts on first render
	useEffect(() => {
		getContacts();
	},[]);
	
	// Get contacts when success is set to true (after deleting, adding, editing contact)
	useEffect(() => {
		if(success) {
			getContacts();
			setSuccess(false);
		}
	}, [success]);

	// Get all contacts
	const getContacts = async () => {
		try {
			const response = await apiClient.get('/contacts/read.php');
			if(response.status !== 200) {
				throw new Error(`Something went wrong. Response status: ${response.status}`);
			}
			setContacts(response.data)
		} catch {
			toast.error('Could not retrieve contacts')
		}
	};
	
	// Delete a contact
	const deleteContact = async (id) => {
		try {
			const confirmDelete = await swal({
				title: 'Sure?',
				text: 'Do you REALLY want to delete this precious contact?',
				icon: 'warning',
				buttons: true,
				dangerMode: true,
			});
			
			if (confirmDelete) {
				const response = await apiClient.delete(`/contacts/delete.php/${id}`)
				if(response.status === 200) {
					toast('💣 Poof! Contact has been deleted');
				} else {
					throw new Error(`Something went wrong. Response status: ${response.status}`);
				}
			}
		} catch {
			toast.error('Seems like the contact does not want to be deleted.');
		}
		setSuccess(true);
	};

	return (
		<Container fluid className='w-100 p-0 m-0'>
		{/* <AdminNavbar className='w-100' /> */}
		{/* <ReportBug/> */}
			<Row className='px-2'>
				<h3 className='px-5 my-3'>Contacts</h3>
			</Row>
			
			<Row>
				<Searchbar setEditContactModal={setEditContactModal} />
			</Row>

			<Row className='px-5 mb-3'>
				<Col>
					<Button
						color='success'
						onClick={toggleAddContactModal}
					>
						Add Contact
					</Button>
					<CSVLink data={contacts} filename='lesbotoč_contacts'>
						<Button
							color='info'
							className='ms-3'
						>
							Export Contacts
						</Button>
					</CSVLink>
				</Col>
			</Row>

			<Row className='px-5'>
				<Table
					bordered
					hover
					responsive
					striped
				>
					<TableHead />
					<tbody>
						{contacts &&
							contacts.map((contact) => (
								<tr className='table-row' key={contact.id}>
									<td className='td td-name'>{contact.name}</td>
									<td className='td td-wherefrom'>{contact.wherefrom}</td>
									<td className='td td-email'>{contact.email}</td>
									<td className='td td-phone'>{contact.phone}</td>
									<td className='td td-newsletter'>
										{(contact.newsletter === 0) ? 'no' : (contact.newsletter === 1) ? 'yes' : ''}
									</td>
									<td className='td td-age'>{contact.age}</td>
									<td className='td td-updated'>
										{!contact.updated_at ? '' : <Moment format='D. MMMM YYYY'>{contact.updated_at}</Moment>}
									</td>
									<td className='td td-crud d-flex justify-content-center p-2'>
										<Button
											outline
											title='Edit contact'
											className='me-2'
											type='button'
											color='info'
											onClick={() => {
												toggleEditContactModal(); 
												setSelectedContact(contact);
											}}
										>
											<i className='bi bi-pencil' />
										</Button>
										<Button
											outline
											title='Delete contact'
											className='ms-2'
											type='button'
											color='danger'
											onClick={() => deleteContact(contact.id)}
										>
											<i className='bi bi-trash' />
										</Button>
									</td>
								</tr>
							))
						}
					</tbody>
				</Table>
			</Row>

			{addContactModal &&
				<AddModal
					toggle={toggleAddContactModal}
					addContactModal={addContactModal}
					setAddContactModal={setAddContactModal}
				/>
			}

			{editContactModal &&
				<EditModal
					editContactModal={editContactModal}
					toggle={toggleEditContactModal}
					setEditContactModal={setEditContactModal}
					setSuccess={setSuccess}
					contact={selectedContact}
				/>
			}
    	</Container>
  	);
}
