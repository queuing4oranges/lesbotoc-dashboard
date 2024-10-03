import React, { useState, useEffect, useContext } from 'react';
import swal from 'sweetalert';
import Moment from 'react-moment';
import { CSVLink } from 'react-csv';
import { toast } from 'react-toastify';

import { Container, Col, Row, Button, Table } from 'reactstrap';

import AdminNavbar from '../../includes/AdminNavbar';
import { apiClient } from '../../api';
import { AdminContext } from '../../AdminContextProvider';

import './more.scss';

export default function More() {
	const [subscribers, setSubscribers] = useState([]);
	const [speedDaters, setSpeedDaters] = useState([]);
	const {
		events, setEvents,
		success, setSuccess
	} = useContext(AdminContext);
	
	useEffect(() => {
		getNewsletterSubscribers();
		getEvents();
		getSpeedDaters();
	}, [success]);

	// Get all newsletter subscribers
	const getNewsletterSubscribers = async () => {
		try {
			const response = await apiClient.get('/contacts/read.php');
			if (response.status !== 200) {
				throw new Error(`Something went wrong. Response status: ${response.status}`);
			}
			// Filter the response data for contacts who subscribed to newsletter
			let result = response.data.filter(function (contact) {
				return contact.newsletter === 1;
			});
			setSubscribers(result);
		} catch {
			toast.error('Could not retrieve contacts');
		}
	};

	const getEvents = async () => {
		try {
			const response = await apiClient.get('/events/read.php');
			if (response.status !== 200) {
				throw new Error(`Something went wrong. Response status: ${response.status}`);
			}
			setEvents(response.data);
		} catch {
			toast.error('Could not retrieve events');
		}
	};

	// TODO: Make list of events with their participants - not just speed dating, for example with a Collapse
	const getSpeedDaters = async () => {
		try {
			const response = await apiClient.get('speeddating/read.php');
			console.log(response, "response from speed dating")
			if (response.status !== 200) {
				throw new Error(`Something went wrong. Response status: ${response.status}`);
			}
			setSpeedDaters(response.data);
		} catch {
			toast.error('Could not retrieve speed dating participants');
		}
	};

	const deleteSpeedDaters = async (id) => {
		try {
			const confirmDelete = await swal({
				title: 'Sure?',
				text: 'Do you really want to exclude this person from finding love?',
				icon: 'warning',
				buttons: true,
				dangerMode: true,
			})
			if (confirmDelete) {
				const response = await apiClient.delete(`/speeddating/delete.php/${id}`)
				if (response.status === 200) {
					toast('🙍‍♀️ Deleted! She will stay single forever', 'success');
				} else {
					throw new Error(`Something went wrong. Response status: ${response.status}`);
				}
			}
		} catch {
			toast.error('Could not delete speed dating participant');
		}
		setSuccess(true);
	};

	return (
		<Container fluid className='w-100 p-0 m-0'>
			<AdminNavbar className='w-100' />
			<Row className='px-2'>
				<h3 className='px-5 my-3'>More...</h3>
			</Row>
			
			<Row className='px-5 mb-3'>
				<Col md='2' className='d-flex flex-column download-button-column'>				
					<Button color='info' title='Download all subscribers to the newsletter'>
						<CSVLink
							className='text-danger text-decoration-none'
							data={subscribers}
							filename='Newsletter Subscribers'
						>
							<span className='fs-5'>
								<i className='bi bi-cloud-download' />
								Newsletter Subscribers
							</span>
						</CSVLink>
					</Button>
					<Button color='info' title='Download all participants to the speed dating event'>
						<CSVLink
							className='text-danger text-decoration-none'
							data={speedDaters}
							filename='Speed Dating Participants'
						>
							<span className='fs-5'>
								<i className='bi bi-cloud-download' />
								Speed Daters
							</span>
						</CSVLink>
					</Button>
					<Button color='info' title='Download a list of all events'>
						<CSVLink
							className='text-danger text-decoration-none'
							data={events}
							filename='List of Events'
						>
							<span className='fs-5'>
								<i className='bi bi-cloud-download' />
								List of Events
							</span>
						</CSVLink>
					</Button>					
				</Col>

				<Col md='10'>
					<div>
						<h4 className='text-danger'>List of Speed Dating Participants</h4>
							<p>
								You can delete the participants after the event. They will still be
								in your contacts if they agreed to storing their data.
							</p>
						{speedDaters &&
							<Table 
								bordered
								hover
								responsive
								striped
							>
								<thead>
									<tr>
										<th>Date</th>
										<th>Name</th>
										<th>Phone</th>
										<th>Email</th>
										<th>Age</th>
										<th className='text-center'>Delete</th>
									</tr>
								</thead>

								<tbody>
									{speedDaters.map((dater, key) => (
										<tr key={key}>
											<td><Moment format='D. MM.'>{dater.date}</Moment></td>
											<td>{dater.name}</td>
											<td>{dater.phone}</td>
											<td>{dater.email}</td>
											<td>{dater.age}</td>
											<td className='text-center'>
												<Button
													outline
													title='Delete'
													type='button'
													color='danger'
													onClick={() => deleteSpeedDaters(dater.id)}
												>
													<i className='bi bi-trash' />
												</Button>
											</td>
										</tr>
									))}
								</tbody>
							</Table>
						}
					</div>
				</Col>
			</Row>
		</Container>
	);
}
