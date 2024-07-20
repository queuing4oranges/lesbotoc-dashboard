import React, { useState } from 'react';
import { Label, FormGroup, FormFeedback, Col, Input, Tooltip, Badge } from 'reactstrap';
import { eventTypes } from '../../Datalists';

export const NameField = ({ register, errors }) => {

	const nameField = register('name', {
		required: 'Please provide a name for the event',
		minLength: {
			value: 5,
			message: 'Minimum 5 characters'
		},
		maxLength: {
			value: 30,
			message: 'More than 25 does not fit in our calendar'
		}
	});
	
	return (
		<FormGroup row>
			<Label htmlFor='nameField'>
				*Name of the event
			</Label>
			<Col>
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
}

export const EventTypeField = ({ register }) => {

	const eventTypeField = register('event_type');

	return (
		<FormGroup row>
			<Label htmlFor='eventTypeField'>
				What type of the event is it?
			</Label>
			<Col>
				<Input
					id='eventTypeField'
					name='event_type'
					placeholder='Click for options'
					list='eventTypes'
					innerRef={eventTypeField.ref}
					onBlur={eventTypeField.onBlur}
					onChange={eventTypeField.onChange}
				/>
			</Col>
			<datalist id='eventTypes'>
				{eventTypes.map((item) => (
					<option key={item.id} value={item.type}></option>
				))}
			</datalist>
		</FormGroup>
	);
}

export const LocationNameField = ({ register }) => {

	const locationNameField = register('loc_name');

	return (
		<FormGroup row>
			<Label htmlFor='locationNameField'>
				Name of the location
			</Label>
			<Col>
				<Input
					id='locationNameField'
					name='loc_name'
					innerRef={locationNameField.ref}
					onBlur={locationNameField.onBlur}
					onChange={locationNameField.onChange}
				/>
			</Col>
		</FormGroup>
	);
}

export const LocationAddressField = ({ register }) => {

	const locationAddressField = register('loc_address');

	return (
		<FormGroup row>
			<Label htmlFor='locationAddressField'>
				Address of the location
			</Label>
			<Col>
				<Input
					id='locationAddressField'
					name='loc_address'
					innerRef={locationAddressField.ref}
					onBlur={locationAddressField.onBlur}
					onChange={locationAddressField.onChange}
				/>
			</Col>
		</FormGroup>
	);
}

export const LatitudeField = ({ register, errors }) => {
	const [tooltipOpen, setTooltipOpen] = useState(false);
	const toggle = () => setTooltipOpen(!tooltipOpen);

	const latitudeField = register('latitude', {
		required: 'Provide latitude for Google Maps please',
	});

	return (
		<FormGroup row>
			<Label htmlFor='latitudeField'>
				*Latitude of location address
				<Badge className='ms-2' color='secondary' id='latitudeTooltip' >
					<i className='bi bi-info-circle' />
				</Badge>
			</Label>
			<Col>
				<Input
					id='latitudeField'
					name='latitude'
					placeholder='50.07146660074448'
					invalid={!!errors.longitude}
					innerRef={latitudeField.ref}
					onBlur={latitudeField.onBlur}
					onChange={latitudeField.onChange}
				/>
				{errors?.latitude && <FormFeedback>{errors.latitude.message}</FormFeedback>}
				<Tooltip
					placement='right'
					target='latitudeTooltip'
					isOpen={tooltipOpen}
					toggle={toggle}
				>
					Copy the Geopoints from Google Maps. The first number is the latitude.
				</Tooltip>
			</Col>
		</FormGroup>
	);
}

export const LongitudeField = ({ register, errors }) => {
	const [tooltipOpen, setTooltipOpen] = useState(false);
	const toggle = () => setTooltipOpen(!tooltipOpen);
	
	const longitudeField = register('longitude', {
		required: 'Provide longitude for Google Maps please',
	});

	return (
		<FormGroup row>
			<Label htmlFor='longitudeField'>
				*Longitude of the location
				<Badge className='mx-2' color='secondary' id='longitudeTooltip'>
					<i className='bi bi-info-circle' />
				</Badge>
			</Label>
			<Col>
				<Input
					id='longitudeField'
					name='longitude'
					placeholder='14.448587090073614'
					invalid={!!errors.longitude}
					innerRef={longitudeField.ref}
					onBlur={longitudeField.onBlur}
					onChange={longitudeField.onChange}
				/>
				{errors?.longitude && <FormFeedback>{errors.longitude.message}</FormFeedback>}
				<Tooltip
					placement='right'
					target='longitudeTooltip'
					isOpen={tooltipOpen}
					toggle={toggle}
				>
					Copy the Geopoints from Google Maps. The second number is the longitude.
				</Tooltip>
			</Col>
		</FormGroup>
	);
}

export const LocationWebsiteField = ({ register }) => {

	const locationWebsiteField = register('loc_website');

	return (
		<FormGroup row>
			<Label htmlFor='locationWebsiteField'>
				Location's Website URL
			</Label>
			<Col>
				<Input
					id='locationWebsiteField'
					name='loc_website'
					placeholder='https://www.queuing4oranges.com/'
					innerRef={locationWebsiteField.ref}
					onBlur={locationWebsiteField.onBlur}
					onChange={locationWebsiteField.onChange}
				/>
			</Col>
		</FormGroup>
	);
}

export const DescriptionField = ({ register }) => {

	const descriptionField = register('description');

	return (
		<FormGroup row>
			<Label htmlFor='descriptionField'>
				Description of the Event
			</Label>
			<Col>
				<Input
					type='textarea'
					id='descriptionField'
					name='description'
					placeholder='Make a new line by using \n after the end of the line'
					innerRef={descriptionField.ref}
					onBlur={descriptionField.onBlur}
					onChange={descriptionField.onChange}
				/>
			</Col>
		</FormGroup>
	);
}

export const DateField = ({ register, errors }) => {

	const dateField = register('date', {
		required: 'Date for event is required',
	});

	return (
		<FormGroup row>
			<Label htmlFor='dateField'>
				*Date
			</Label>
			<Col>
				<Input
					type='date'
					id='dateField'
					name='date'
					invalid={!!errors.date}
					innerRef={dateField.ref}
					onBlur={dateField.onBlur}
					onChange={dateField.onChange}
				/>
				{errors?.date && <FormFeedback>{errors.date.message}</FormFeedback>}
			</Col>
		</FormGroup>
	);
}

export const TimeField = ({ register, errors }) => {

	const timeField = register('time', {
		required: 'Time for event is required',
	});

	return (
		<FormGroup row>
			<Label htmlFor='timeField'>
				*Time
			</Label>
			<Col>
				<Input
					type='time'
					id='timeField'
					name='time'
					invalid={!!errors.time}
					innerRef={timeField.ref}
					onBlur={timeField.onBlur}
					onChange={timeField.onChange}
				/>
				{errors?.time && <FormFeedback>{errors.time.message}</FormFeedback>}
			</Col>
		</FormGroup>
	);
}

export const PriceField = ({ register }) => {

	const priceField = register('price');

	return (
		<FormGroup row>
			<Label htmlFor='priceField'>
				Price in CZK
			</Label>
			<Col>
				<Input
					type='price'
					id='priceField'
					name='price'
					innerRef={priceField.ref}
					onBlur={priceField.onBlur}
					onChange={priceField.onChange}
				/>
			</Col>
		</FormGroup>
	);
}

export const CapacityField = ({ register }) => {

	const capacityField = register('capacity');

	return (
		<FormGroup row>
			<Label htmlFor='capacityField'>
				For how many people?
			</Label>
			<Col>
				<Input
					type='capacity'
					id='capacityField'
					name='capacity'
					innerRef={capacityField.ref}
					onBlur={capacityField.onBlur}
					onChange={capacityField.onChange}
				/>
			</Col>
		</FormGroup>
	);
}

export const EventImageField = ({ register, errors }) => {
	const [tooltipOpen, setTooltipOpen] = useState(false);
	const toggle = () => setTooltipOpen(!tooltipOpen);

	const eventImageField = register('eventImage', {
		required: 'Please provide an image for the event',
	});

	
	return (
		<FormGroup row>
			<Label htmlFor='eventImageField'>
				*Upload of Event image
				<Badge className='ms-2' color='secondary' id='eventImageTooltip'>
					<i className='bi bi-info-circle' />
				</Badge>
			</Label>
			<Col>
				<Input
					type='file'
					id='eventImageField'
					name='eventImage'
					invalid={!!errors.eventImage}
					innerRef={eventImageField.ref}
					onBlur={eventImageField.onBlur}
					onChange={eventImageField.onChange}
				/>
				{errors?.eventImage && <FormFeedback>{errors.eventImage.message}</FormFeedback>}
				
				<Tooltip
					placement='right'
					target='eventImageTooltip'
					isOpen={tooltipOpen}
					toggle={toggle}
					autohide={false}
				>	
					Upload images up to 300kb. Recommended is under 100kb. 
					The smaller the image - the faster the website. 
					<br />
					Allowed format:
					<br />
					jpeg, png, gif.
					<br />
					<a
						href='https://imagecompressor.com/'
						target='_blank'
						rel='noreferrer'
						className='mb-2'
					>
						Online Image Compressor
					</a>
				</Tooltip>
			</Col>
		</FormGroup>
	);
}

export const SignupField = ({ register }) => {

	const signupField = register('signup');

	return (
		<FormGroup check inline>
			<Col>
				<Input
					id='signupField'
					name='signup'
					type='checkbox'
					innerRef={signupField.ref}
					onBlur={signupField.onBlur}
					onChange={signupField.onChange}
				/>
				<Label check htmlFor='signupField'>This event needs a signup form</Label>
			</Col>
		</FormGroup>
	);
}