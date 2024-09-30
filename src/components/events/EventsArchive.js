import React, { useEffect, useContext } from 'react';
import { toast } from 'react-toastify';
import Moment from 'react-moment';

import { Container, Col, Row, Card, CardBody, Table, Button, ButtonGroup } from 'reactstrap';

import { AdminContext } from '../../AdminContextProvider';
import { deleteEvent } from './utils/deleteEvent';
import { apiClient } from '../../api';
import EditEvent from './EditEvent';
import AdminNavbar from '../../includes/AdminNavbar';

export default function EventsArchive() {
	const {
		events, setEvents,
		setSuccess, success,
		selectedEvent, setSelectedEvent,
		editEventModal, setEditEventModal
	} = useContext(AdminContext);
	
	const toggle = () => setEditEventModal(!editEventModal);

	// Make sure to get events if user doesnt uses URL instead of navigation
	useEffect(() => {
		fetchEventsIfNotLoaded();
	}, [success])

	const fetchEventsIfNotLoaded = async () =>{
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

	return (
		<Container fluid className='w-100 p-0 m-0'>
			<AdminNavbar className='w-100' />
			<Row className='px-2'>
				<h3 className='px-5 my-3'>Events Archive</h3>
			</Row>

			<Row className='px-5 mb-3'>
				<Col>
					<Card>
						{events && (
							<CardBody>
								<div  className='table-responsive'>
									<Table
										bordered
										hover
										responsive
										striped
									>
										<thead>
											<tr className='event-table-row align-middle'>
												<th>Event</th>
												<th>Venue</th>
												<th><i className='me-2 bi bi-geo-alt' />Address</th>
												<th><i className='me-2 bi bi-globe' />Website</th>
												<th><i className='me-2 bi bi-calendar-heart' />Date</th>
												<th className='text-nowrap'><i className='me-2 bi bi-alarm' />Time</th>
												<th className='text-nowrap'><i className='me-2 bi bi-cash-coin' />Price</th>
												<th className='text-nowrap'><i className='me-2 bi bi-people' />Capacity</th>
												<th>Description</th>
												<th className='text-nowrap'><i className='me-2 bi bi-card-checklist' />Signup</th>
												<th>Edit / Delete</th>
											</tr>
										</thead>

										<tbody>
											{events.map((event, key) => (
												<tr key={key}>
													<td>{event?.name}</td>
													<td>{event?.loc_name}</td>
													<td>{event?.loc_address}</td>
													<td>{event?.loc_website}</td>
													<td>
														{(event?.date === '0000-00-00') ? '' : <Moment format='D. MMMM YYYY'>{event.date}</Moment>
														}
													</td>
													<td>{(event?.time === '00:00:00') ? '' : event.time}</td>
													<td>{event?.price}</td>
													<td>{event?.capacity}</td>
													<td>{event?.description}</td>
													<td className='text-center'>
														{(event?.signup === 1) ?
															<i className='text-success bi bi-check-lg' />
														:
															<i className='text-danger bi bi-x-lg' />
														}
													</td>
													<td>
														<ButtonGroup>
															<Button
																outline
																title='Edit event'
																className='me-2'
																type='button'
																color='info'
																onClick={() => {
																	toggle();
																	setSelectedEvent(event);
																	setSuccess(false);
																}}
																>
																<i className='bi bi-pencil' />
															</Button>
															
															<Button
																outline
																title='Delete event'
																className='ms-2'
																type='button'
																color='danger'
																onClick={() => {
																	deleteEvent(event.id, setSuccess);
																	setSuccess(false);
																}}
															>
																<i className='bi bi-trash' />
															</Button>
														</ButtonGroup>
													</td>
												</tr>
											))}
										</tbody>
									</Table>
								</div>
							</CardBody>
						)}
					</Card>
				</Col>
			</Row>
			
			{editEventModal &&
				<EditEvent
					success={success}
					setSuccess={setSuccess}
					toggle={toggle}
					editEventModal={editEventModal}
					setEditEventModal={setEditEventModal}
					event={selectedEvent}
					setSelectedEvent={setSelectedEvent}
				/>
			}
		</Container>
	);
}
