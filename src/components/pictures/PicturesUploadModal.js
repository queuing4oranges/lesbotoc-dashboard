import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify'

import {
	Label, Input, Button,
	FormGroup, FormFeedback,
	Modal, ModalHeader, ModalBody
} from 'reactstrap';

import { apiClient } from '../../api';
import { AdminContext } from '../../AdminContextProvider';

export default function PicturesUploadModal({ toggleAddImageModal, addImageModal }) {
	const { setSuccess } = useContext(AdminContext);
	const { register, handleSubmit, reset, formState: { errors } } = useForm();

	// Set up register fields for react-hook-form
	const titleField = register('title', {
		required: 'Please provide a title for the image'
	});

	const imageField = register('image', {
		required: 'Please provide an image'
	});

	// Upload image to the Database
	const uploadImage = async (data) => {
		setSuccess(false);
		try {
			const form = document.getElementById('image-form');
			const formData = new FormData(form);
			const image = data.image[0];
			formData.append('image', image);

			const response = await apiClient.post('/images/upload.php', formData);
			if (response.status === 200) {
				toast('🚀 Congrats! Pixels delivered.');
			} else {
				throw new Error(`Something went wrong. Response status: ${response.status}`);
			}
		} catch {
			toast.error('Could not add image');
		}
		setSuccess(true);
		toggleAddImageModal();
	};

	return (
		<Modal
			isOpen={addImageModal}
			toggle={toggleAddImageModal}
		>
			<ModalHeader>Add an image</ModalHeader>
			<form
				onSubmit={handleSubmit(uploadImage)}
				className='p-3'
				encType='multipart/form-data'
				id='image-form'
			>
				<ModalBody>
					<FormGroup className='mt-3'>
						<Label htmlFor='titleField'>Title</Label>
						<Input
							type='text'
							id='titleField'
							name='title'
							invalid={errors.title && true}
							innerRef={titleField.ref}
							onBlur={titleField.onBlur}
							onChange={titleField.onChange}
						/>
						{errors?.title && <FormFeedback>{errors?.title?.message}</FormFeedback>}
					</FormGroup>

					<FormGroup className='mt-3'>
						<Label htmlFor='imageField'>Image</Label>
						<Input
							type='file'
							id='imageField'
							name='image'
							invalid={errors.image && true}
							innerRef={imageField.ref}
							onBlur={imageField.onBlur}
							onChange={imageField.onChange}
						/>
						{errors?.image && <FormFeedback>{errors?.image?.message}</FormFeedback>}
					</FormGroup>

					<FormGroup className='d-flex justify-content-between mt-5'>
						<Button
							color='warning'
							onClick={() => {
								reset();
								toggleAddImageModal();
							}}
						>
							Close
						</Button>
						<Button
							color='success'
							type='submit'
						>
							Upload
						</Button>
					</FormGroup>
				</ModalBody>
			</form>
		</Modal>
	)
}
