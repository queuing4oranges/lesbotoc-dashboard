import React, { useContext } from 'react';
import { AdminContext } from '../../AdminContextProvider';
import { useForm } from 'react-hook-form';
import { editEvent } from './utils/editEvent';

import {
	NameField, EventTypeField, LocationNameField,
	LocationAddressField, LatitudeField, LongitudeField,
	LocationWebsiteField, DescriptionField,
	DateField, TimeField, PriceField, CapacityField,
	SignupField
} from './EventFormFields';

import { Modal, ModalBody, ModalHeader, Row, Col, Button } from 'reactstrap';

export default function EditEvent({ event, toggle, ...props }) {
	const { setSuccess } = useContext(AdminContext);
	const { id } = event;

	const { register, handleSubmit, reset, formState: { errors } } = useForm({
		defaultValues: { ...event, id }
	});

	// Edit an event
	const onSubmit = async (values) => {
		await editEvent(id, values, toggle, setSuccess);
		reset();
	};
	
	return (
		<Modal
			isOpen={props.editEventModal}
			toggle={toggle}
			size='xl'
		>
			<ModalHeader>Edit an event</ModalHeader>
			<ModalBody className='event-modal-body'>
				<form
					onSubmit={handleSubmit(onSubmit)}
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
								onClick={toggle}
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
		