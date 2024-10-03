import React from 'react';
import { Link } from 'react-router-dom';
import { Form, FormText, FormGroup, Label, Input, Button } from 'reactstrap';

import './adminlogin.scss'

export default function AdminLogin() {
	return (
	<div className='admin-login-container h-100 d-flex justify-content-center align-items-center position-relative'>
		<Form className='admin-login-form p-4 d-flex flex-column align-items-center'>
			<FormText>
				<h3 className='mb-5 text-primary'>Welcome back!</h3>
    		</FormText>	
			
			<FormGroup>
				<Label htmlFor='adminUsername'>Username</Label>
				<Input
					type='text'
					id='adminUsername'
					placeholder='El Bosso'
				/>
			</FormGroup>
			
			<FormGroup>
				<Label htmlFor='adminPassword'>Password</Label>
				<Input
					type='password'
					id='adminPassword'
					placeholder='********'
				/>
			</FormGroup>
			
			<Button className='login-button my-3' color='primary'>Login</Button>

			<Link to={'/contacts'}>
				<Button type='submit' color='primary' className='mt-3'>
					Login as Guest Admin
				</Button>
			</Link>
		</Form>
	</div>
	);
}
