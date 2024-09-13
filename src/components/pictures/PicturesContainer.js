import React, { useState, useEffect, useContext } from "react";
import swal from "sweetalert";
import Moment from "react-moment";

import { Container, Row, Col, Card, CardImg, CardBody, CardText, Button, CardTitle } from "reactstrap";

import { toast } from 'react-toastify';

import AdminNavbar from "../../includes/AdminNavbar";
import { AdminContext } from "../../AdminContextProvider";
import { apiClient, baseURL } from '../../api';

import './images.scss';
import PicturesUploadModal from "./PicturesUploadModal";


export default function PicturesContainer() {
	const [images, setImages] = useState([]);
	const [addImageModal, setAddImageModal] = useState(false);
	const { success, setSuccess } = useContext(AdminContext);
	const toggleAddImageModal = () => setAddImageModal(!addImageModal)

	useEffect(() => {
		getImages();
	}, [success]);

	// Display images (from images folder with image_path saved in DB)
	const getImages = async () => {
		try {
			const response = await apiClient.get('/images/read.php');
			if (response.status !== 200) {
				throw new Error(`Something went wrong. Response status: ${response.status}`);
			}
			setImages(response.data);
		} catch {
			toast.error('Could not retrieve images')
		}
	};

	// Delete image
	const deleteImage = async (id) => {
		setSuccess(false);
		try {
			const confirmDelete = await swal({
				title: 'Don\'t like the image?',
				text: 'Let\'s get rid of it!',
				icon: 'warning',
				dangerMode: true,
			});

			if(confirmDelete) {
				const response = await apiClient.delete(`/images/delete.php/${id}`);
				if (response.status === 200) {
					toast('📸 One less pixelated memory to worry about!')
				} else {
					throw new Error(`Something went wrong. Response status: ${response.status}`)
				}
			}
		} catch {
			toast.error('Seems like this one is staying. Hope it isn\'t too embarrassing')
		}
		setSuccess(true);
	};

	return (
		<Container fluid className='w-100 p-0 m-0'>
			<AdminNavbar className='w-100' />
			<Row className='px-2'>
				<h3 className='px-5 my-3'>Picture Gallery</h3>
			</Row>
			<Row className='px-5 mb-3'>
				<Col className='me-3 d-flex align-items-center'>
					<Button
						color='success'
						className='me-3'
						onClick={toggleAddImageModal}
					>
						Add Image
					</Button>
					<p className="text-success me-3 mb-0">For best performace, choose image in landscape, max. 100kb in jpeg, jpg, png, gif format</p>
					<i className="bi bi-arrow-right me-3" />
					<Button outline color='success'>
						<a className="text-danger" href="https://imagecompressor.com/" target="_blank" rel="noreferrer">Online Image Compressor</a>
					</Button>
				</Col>
			</Row>
			<Row className='px-5 mb-3'>
				{images && images.map((img, idx) => (
					<Col key={idx} xs={12} sm={6} md={4} lg={3} className='mb-4'>
						<Card className='gallery-card'>
							<img
								src={`${baseURL}/images/images/${img?.filename}`}
								alt={`${img.filename}`}
								className='gallery-image'>
							</img>
							<CardTitle className='p-2' tag='h4'>{img?.title}</CardTitle>
							<CardText className='p-2 d-flex justify-content-between'>
								<span>
									<p className="text-muted m-0">File name: {img?.filename}</p>
									<p className="text-muted m-0">Uploaded at: {<Moment format="D. MM YYYY">{img.created_at}</Moment>}</p>
								</span>
								<span>
									<Button
										color='danger'
										id={img.id}
										onClick={() => deleteImage(img.id)}
									>
										<i className="bi bi-trash" />
									</Button>
								</span>
							</CardText>
						</Card>
					</Col>
				))}
			</Row>

			{addImageModal &&
				<PicturesUploadModal
					toggleAddImageModal={toggleAddImageModal}
					addImageModal={addImageModal}
				/>
			}
		</Container>
	);
}
