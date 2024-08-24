import React, { useEffect, useContext } from 'react';
import { useForm } from 'react-hook-form'; 
import { toast } from 'react-toastify';

import { Container, Col, Row, Card, CardBody, CardHeader, Button } from 'reactstrap';

import { AdminContext } from '../../AdminContextProvider';
import AdminNavbar from '../../includes/AdminNavbar';
import EditEvent from './EditEvent';
import apiClient from '../../api';
import EventsList from './EventsList';

import { 
	NameField, EventTypeField, LocationNameField,
	LocationAddressField, LatitudeField, LongitudeField,
	LocationWebsiteField, DescriptionField,
	DateField, TimeField, PriceField, CapacityField,
	EventImageField, SignupField 
} from './EventFormFields';

export default function EventsContainer() {
	
	const {
		setEvents,
		success, setSuccess,
		selectedEvent, setSelectedEvent,
		editEventModal, setEditEventModal
	} = useContext(AdminContext);
	
	const toggle = () => setEditEventModal(!editEventModal);
	const { register, handleSubmit, reset, formState: { errors } } = useForm();
	
	useEffect(() => {
		getEvents();

		if(success) {
			getEvents();
			setSuccess(false);			
		}
	}, [success])

	const getEvents = async () => {
		try {
			const response = await apiClient.get('/events/read.php');
			if(response.status !== 200) {
				throw new Error(`Something went wrong. Response status: ${response.status}`);
			}
			setEvents(response.data);
		} catch {
			toast.error('Could not retrieve events')
		}
	};

	// Create an event
	const addEvent = async (values) => {
		const form = document.getElementById('add-event-form');
		const formData = new FormData(form); // Create a form data object
		const eventImage = values.eventImage[0];
		formData.append('image_path', eventImage); // Append image to form data object

		// Convert signup boolean to tinyint for DB
		if (values) {
			values.signup === false ? values.signup = 0 : values.signup = 1
			formData.append('signup', values.signup)
		}

		try {
			const response = await apiClient.post('/events/create.php', formData);
			if (response.status === 200) {
				toast('🚂 Fantastic. New event is coming to town!')
			}
		} catch (error) {
			toast.error('Could not create an event');
		}
		reset();
		setSuccess(true);
	}
	
	return (
		<Container fluid className='w-100 p-0 m-0 events-container'>
			<AdminNavbar className='w-100' />
			<Row className='px-2'>
				<h3 className='mx-5 my-3'>Events</h3>
			</Row>

			<Row className='mx-5 mb-3'> 
				<Col md='3' className='overflow-y-auto' style={{ height: '100vh'}}>
					<EventsList toggle={toggle} />
				</Col>
				
				<Col md='9'>
					<Card className='add-event-card'>
						<CardHeader>Add an Event</CardHeader>
						<CardBody>
							<form
								onSubmit={handleSubmit(addEvent)}
								className='p-3 d-flex flex-column'
								encType='multipart/form-data'
								id='add-event-form'
							>
								<Row>
									<Col md='6'><NameField register={register} errors={errors} /></Col>
									<Col md='6'><EventTypeField register={register} /></Col>
								</Row>

								<LocationNameField register={register} />
								<LocationAddressField register={register} />

								<Row>
									<Col md='6'><LatitudeField register={register} errors={errors} /></Col>
									<Col md='6'><LongitudeField register={register} errors={errors} /></Col>
								</Row>

								<LocationWebsiteField register={register} />
								<DescriptionField register={register} />

								<Row className='d-flex'>
									<Col md='3'><DateField register={register} errors={errors}/></Col>
									<Col md='3'><TimeField register={register} errors={errors} /></Col>
									<Col md='3'><PriceField register={register} errors={errors} /></Col>
									<Col md='3'><CapacityField register={register} errors={errors} /></Col>
								</Row>

								<Row>
									<Col md='6'>
										<EventImageField register={register} errors={errors} />
									</Col>
								</Row>

								<SignupField register={register} />

								<Row className='mt-2'>
									<Col className='d-flex justify-content-end'>
										<Button
											type='submit'
											color='success'
											className='d-block'
										>
											Create event
										</Button>
									</Col>
								</Row>
							</form>
						</CardBody>
					</Card>
				</Col>
			</Row>
			
			{editEventModal &&
				<EditEvent
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
