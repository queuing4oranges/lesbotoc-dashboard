import React from 'react';
import { Label, FormGroup, FormText, FormFeedback, Col, Input } from 'reactstrap';
import { ageGroups } from '../../data/Datalists';

export const NameField = ({ register, errors }) => {

	const nameField = register('name', {
		required: 'Please provide a name',
		minLength: {
			value: 3,
			message: 'Minimum 3 characters'
		},
		maxLength: {
			value: 30,
			message: 'Maximum 30 characters'
		}
	});

	return (
		<FormGroup row className='mt-3'>
			<Label sm={2} htmlFor='nameField' className='d-flex justify-content-start'>
				<i className='bi bi-person me-2' />
				Jméno
			</Label>
			<Col sm={10} className='d-flex flex-column'>
				<Input
					id='nameField'
					name='name'
					invalid={!!errors.name}
					innerRef={nameField.ref}
					onBlur={nameField.onBlur}
					onChange={nameField.onChange}
				/>
				{errors?.name && <FormFeedback>{errors.name.message}</FormFeedback>}
			</Col>
		</FormGroup>
	);
};

export const EmailField = ({ register, errors }) => {

	const emailField = register('email', {
		required: 'Please provide an email',
		pattern: {
			value: /^[A-Z0-9._%+-ěščřžýá]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
			message: 'Not an email address'
		}
	});

	return (
		<FormGroup row>
			<Label sm={2} htmlFor='email' className='d-flex justify-content-start'>
				<i className='bi bi-envelope-at me-2' />
				Email
			</Label>
			<Col sm={10}>
				<Input
					id='emailField'
					name='email'
					invalid={!!errors.email}
					innerRef={emailField.ref}
					onBlur={emailField.onBlur}
					onChange={emailField.onChange}
				/>
				{errors?.email && <FormFeedback>{errors.email.message}</FormFeedback>}
			</Col>
		</FormGroup>
	);
};

export const AgeField = ({ register, errors }) => {

	const ageField = register('age', {
		pattern: {
			value: /^(\d{ 2} |\d{ 2} -\d{ 2})$/,
			message: 'Invalid format'
		}
	});

	return (
		<FormGroup row>
			<Label sm={2} htmlFor='age' className='d-flex justify-content-start'>
				<i className='bi bi-cake2 me-2' />
				Věk
			</Label>
			<Col sm={10}>
				<input
					className='form-control'
					placeholder='Share if you wish.'
					list='user_ages'
					id='ageField'
					name='age'
					invalid={!!errors.age}
					innerRef={ageField.ref}
					onBlur={ageField.onBlur}
					onChange={ageField.onChange}
				/>
				{errors?.age && <FormFeedback>{errors.age.message}</FormFeedback>}
				<datalist id='user_ages'>
					{ageGroups.map((age) => (
						<option key={age.id} value={age.age}></option>
					))}
				</datalist>
			</Col>
		</FormGroup>
	)
}

export const PhoneField = ({ register, errors }) => {

	const phoneField = register('phone', {
		required: 'Add your phone number for updates please',
		pattern: {
			value: /^\d{9,14}$/,
			message: 'Invalid format'
		}
	});

	return (
		<FormGroup row>
			<Label sm={2} htmlFor='phone' className='d-flex justify-content-start'>
				<i className='bi bi-phone me-2'></i>
				Telefon*
			</Label>
			<Col sm={10}>
				<Input
					id='phoneField'
					name='phone'
					invalid={!!errors.phone}
					innerRef={phoneField.ref}
					onBlur={phoneField.onBlur}
					onChange={phoneField.onChange}
				/>
				{errors?.phone && <FormFeedback>{errors.phone.message}</FormFeedback>}
				<FormText>*Telefon  - bude použit pro předání pouze v případě shody</FormText>
			</Col>
		</FormGroup>
	)
}

export const NewsletterCheckbox = ({ register }) => {
	return (
		<FormGroup check inline>
			<Col sm={12} className='pe-0'>
				<Input
					type='checkbox'
					{...register('newsletter')}
					id='speedNewsletter'
					className='me-2'
				/>
				<Label check htmlFor='speedNewsletter'>Chci dostávat informace o dalších akcích Lesbotoče.</Label>
			</Col>
		</FormGroup>
	)
}