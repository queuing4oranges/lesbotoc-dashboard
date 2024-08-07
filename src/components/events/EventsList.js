import React, { useContext } from 'react';
import { AdminContext } from '../../AdminContextProvider';
import { Card, CardBody, CardHeader, Button, ButtonGroup } from 'reactstrap';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { deleteEvent } from './utils/deleteEvent';

export default function EventsList({ toggle }) {
	
	const { events, setSelectedEvent, setSuccess } = useContext(AdminContext);

	return (
		<Card className='h-100'>
			<CardHeader>
				<Link className='text-light w-100' to={'/events/archive'} style={{textDecoration: 'none'}}>
					<Button block color='info'>
						Go to All Events
					</Button>
				</Link>
			</CardHeader>
			
			<CardBody className='p-1 h-100 overflow-y-auto'>
			{events &&
				events.map((event, idx) => (
					<div key={idx} className='p-2 my-1 single-event d-flex justify-content-between'>
						<div className='d-flex flex-column justify-content-center'>
							<h6>{event?.name}</h6>
							{(event.date !== '0000-00-00') &&
								<p>
									<Moment format='DD. MMMM '>{event.date}</Moment>
									<Moment format='YYYY'>{event.date}</Moment>
								</p>
							}
						</div>
						<div className='d-flex align-items-start'>
							<ButtonGroup>
								<Button
									outline
									title='Edit event'
									type='button'
									color='info'
									className='me-2 flex-grow-1'
									onClick={() => {
										toggle();
										setSelectedEvent(event);
									}}
								>
									<i className='bi bi-pencil' />
								</Button>
								<Button
									outline
									title='Delete event'
									type='button'
									color='danger'
									className='ms-2 flew-grow-1'
									onClick={() => deleteEvent(event.id, setSuccess)}
								>
									<i className='bi bi-trash' />
								</Button>
							</ButtonGroup>
						</div>
					</div>
				))}
			</CardBody>
		</Card>
	);
}
