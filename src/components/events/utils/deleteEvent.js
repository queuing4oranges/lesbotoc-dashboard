import swal from 'sweetalert';
import { toast } from 'react-toastify';
import apiClient from '../../../api';

// Delete an event
export async function deleteEvent(id, setSuccess) {

	try {
		const confirmDelete = await swal({
			title: 'Sure?',
			text: 'Do you REALLY want to delete this exquisite event?',
			icon: 'warning',
			buttons: true,
			dangerMode: true,
		});

		if (confirmDelete) {
			const response = await apiClient.delete(`/events/delete.php/${id}`)
			if (response.status === 200) {
				toast('🧯Deleted - gone forever');
			} else {
				throw new Error(`Something went wrong. Response status: ${response.status}`);
			}
		}
	} catch {
		toast.error('Seems like you need to keep that event forever');
	}
	setSuccess(true);
};