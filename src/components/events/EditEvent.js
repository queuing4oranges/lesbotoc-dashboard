import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import {
	NameField, EventTypeField, LocationNameField,
	LocationAddressField, LatitudeField, LongitudeField,
	LocationWebsiteField, DescriptionField,
	DateField, TimeField, PriceField, CapacityField,
	SignupField
} from './EventFormFields';

import { Modal, ModalBody, ModalHeader, Row, Col, Button } from 'reactstrap';

import { AdminContext } from '../../AdminContextProvider';
import apiClient from '../../api';


export default function EditEvent({ event, ...props }) {
	const { setSuccess } = useContext(AdminContext);
	const { id } = event;

	const { register, handleSubmit, formState: { errors } } = useForm({
		defaultValues: { ...event, id }
	});

	// Edit an event
	const editEvent = async (values) => {
		// Convert value to tinyint for DB
		if(values){
			values.signup === false ? values.signup = 0 : values.signup = 1
		}
		try {
			const response = await apiClient.put(`events/update.php/${id}`, {...values, id});
		
			if (response.status === 200) {
				props.toggle();
				toast('⭐ Well done! You edited an event!');
			} else {
				throw new Error(`Something went wrong. Response status: ${response.status}`);
			}
		} catch {
			toast.error('Could not edit the event.');
		}
		setSuccess(true);
	};
	
	return (
		<Modal
			isOpen={props.editEventModal}
			toggle={props.toggle}
			size='xl'
		>
			<ModalHeader>Edit an event</ModalHeader>
			<ModalBody className='event-modal-body'>
				<form
					onSubmit={handleSubmit(editEvent)}
					encType='multipart/form-data'
					id='edit-event-form'
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
						<Col md='3'><DateField register={register} errors={errors} /></Col>
						<Col md='3'><TimeField register={register} errors={errors} /></Col>
						<Col md='3'><PriceField register={register} errors={errors} /></Col>
						<Col md='3'><CapacityField register={register} errors={errors} /></Col>
					</Row>

					<SignupField register={register} />

					<Row className='mt-2'>
						<Col className='d-flex justify-content-between'>
							<Button
								type='button'
								color='warning'
								onClick={props.toggle}
							>
								Discard Changes
							</Button>
							<Button
								type='submit'
								color='success'
								className='d-block'
							>
								Save changes
							</Button>
						</Col>
					</Row>
				</form>
			</ModalBody>
		</Modal>
	);
}
		