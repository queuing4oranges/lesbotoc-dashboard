import React from 'react';
import { Label, Form, FormGroup, FormFeedback, Col, Input, Modal, ModalHeader, ModalBody, Button } from 'reactstrap';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { ageGroups, wherefromPlaces } from '../../Datalists';
import apiClient from '../../api';

import './AddModal.scss';

export default function AddModal({ toggle, addContactModal, setAddContactModal, setSuccess }) {
	
	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm();
	
	// Validate that the contact has a name as minimum
	const nameField = register('name', {
		required: 'Please provide a name',
		minLength: {
			value: 3,
			message: 'Minimum 3 characters'
		},
	});
	
	const wherefromField = register('wherefrom');
	const emailField = register('email');
	const phoneField = register('phone');
	const ageField = register('age');
	const newsletterField = register('newsletter');
	
	const addContact = async (values) => {
		try {
			const response = await apiClient.post('/contacts/create.php', values);
			if (response.status === 200) {
				setAddContactModal(false);
				toast('🌈 Yeah baby! You added a new contact!')
			} else {
				throw new Error(`Something went wrong. Response status: ${response.status}`);
			}
		} catch {
			toast.error('Could not create a new contact')
		}
		setSuccess(true);
	};
	
	
	return (
		<Modal 
			isOpen={addContactModal}
			toggle={toggle}
		>
			<ModalHeader>Add a contact</ModalHeader>

			<ModalBody>
				<Form
					onSubmit={handleSubmit(addContact)}
					className=' contact-form p-3'
					method='post'
				>
						<FormGroup className='mt-3'>
							<Label htmlFor='nameField'>
								Name
							</Label>
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
							<Label htmlFor='wherefromField'>
								Where did we meet?
							</Label>
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
							<Label htmlFor='emailField'>
								Email
							</Label>
							<Col>
								<Input
									autoComplete='on'
									type='email'
									id='emailField'
									name='email'
									invalid={!!errors.email}
									innerRef={emailField.ref}
									onBlur={emailField.onBlur}
									onChange={emailField.onChange}
								/>
							</Col>
						</FormGroup>

						<FormGroup className='mt-3'>
							<Label htmlFor='phoneField'>
								Phone
							</Label>
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
							<Label htmlFor='ageField'>
								Age Group
							</Label>
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
								onClick={toggle}
								>
								Close
							</Button>
							<Button
								color='success'
								type='submit'
							>
								Save
							</Button>
						</Col>
				</Form>
			</ModalBody>
		</Modal>
  	);	
}
