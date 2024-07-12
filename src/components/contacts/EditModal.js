import React from 'react';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';

import {
	Label, Input, Col, Button,
	Form, FormGroup, FormFeedback,
	Modal, ModalHeader, ModalBody
} from 'reactstrap';

import apiClient from '../../api';
import { wherefromPlaces, ageGroups } from '../../Datalists';

export default function EditModal({ contact, ...props }) {
	const { id, name, wherefrom, email, phone, newsletter, age, updated_at} = contact;

	const { register, handleSubmit, formState: { errors } } = useForm({
		defaultValues: {
			id, name, wherefrom, email, phone, age, updated_at, newsletter: Boolean(newsletter)
		}
	});

	// Validate that the contact has a name as minimum
	const nameField = register('name', {
		required: 'Please provide a name',
		minLength: {
			value: 3,
			message: 'Minimum 3 characters'
		},
	});

	// Set up register fields for react-hook-form
	const wherefromField = register('wherefrom');
	const emailField = register('email');
	const phoneField = register('phone');
	const ageField = register('age');
	const newsletterField = register('newsletter');


	// Send put request to edit a contact
	const editContact = async (values) => {
		try {
			const response = await apiClient.put(`/contacts/update.php/${id}`, values);
			if (response.status === 200) {
				props.setEditContactModal(false);
				toast('🍭 Yeah baby! You edited a new contact!');
			} else {
				throw new Error(`Something went wrong. Response status: ${response.status}`);
			}
		} catch {
			toast.error('Could not edit the contact.');
		}
		props.setSuccess(true);
	};
	
	return (
		<Modal
			isOpen={props.editContactModal}
			toggle={props.toggle}
		>
			<ModalHeader>Edit a contact</ModalHeader>
			<ModalBody>
				<Form
					onSubmit={handleSubmit(editContact)}
					className='p-3'
				>
					<FormGroup className='mt-3'>
						<Label htmlFor='nameField'>Name</Label>
						<Col>
							<Input
								autoComplete='on'
								type='text'
								id='nameField'
								name='name'
								invalid={errors.name && true}
								innerRef={nameField.ref}
								onBlur={nameField.onBlur}
								onChange={nameField.onChange}
							/>
							{errors?.name && <FormFeedback>{errors?.name?.message}</FormFeedback>}
						</Col>
					</FormGroup>

					<FormGroup className='mt-3'>
						<Label htmlFor='wherefromField'>Where did we meet?</Label>
						<Col>
							<Input
								className='form-control'
								id='wherefromField'
								name='wherefrom'
								innerRef={wherefromField.ref}
								onBlur={wherefromField.onBlur}
								onChange={wherefromField.onChange}
								list='places'
								placeholder='Click for options'
							/>
							<datalist id='places'>
								{wherefromPlaces.map((item) => (
									<option key={item.id} value={item.place}></option>
								))}
							</datalist>
						</Col>
					</FormGroup>

					<FormGroup className='mt-3'>
						<Label htmlFor='emailField'>Email</Label>
						<Col>
							<Input
								autoComplete='on'
								type='email'
								id='emailField'
								name='email'
								innerRef={emailField.ref}
								onBlur={emailField.onBlur}
								onChange={emailField.onChange}
							/>
						</Col>
					</FormGroup>

					<FormGroup className='mt-3'>
						<Label htmlFor='phoneField'>Phone</Label>
						<Col>
							<Input
								autoComplete='on'
								type='text'
								id='phoneField'
								name='phone'
								innerRef={phoneField.ref}
								onBlur={phoneField.onBlur}
								onChange={phoneField.onChange}
							/>
						</Col>
					</FormGroup>

					<FormGroup className='mt-3'>
						<Label htmlFor='ageField'>Age Group</Label>
						<Col>
							<Input
								id='ageField'
								name='age'
								innerRef={ageField.ref}
								onBlur={ageField.onBlur}
								onChange={ageField.onChange}
								list='ages'
								placeholder='Click for options'
							/>
						</Col>
						<datalist id='ages'>
							{ageGroups.map((item) => (
								<option key={item.id} value={item.age}></option>
							))}
						</datalist>
					</FormGroup>

					<FormGroup check inline>
						<Col>
							<Input
								id='newsletterField'
								name='newsletter'
								type='checkbox'
								innerRef={newsletterField.ref}
								onBlur={newsletterField.onBlur}
								onChange={newsletterField.onChange}
							/>
							<Label check htmlFor='newsletterField'>Contact wants newsletter?</Label>
						</Col>
					</FormGroup>
					<Col className='mt-4 d-flex justify-content-between'>
						<Button
							type='button'
							color='warning'
							onClick={props.toggle}
						>
							Discard Changes
						</Button>
						<Button
							color='success'
							type='submit'
						>
							Save Changes
						</Button>
					</Col>
				</Form>
			</ModalBody>			
		</Modal>
	);
}
