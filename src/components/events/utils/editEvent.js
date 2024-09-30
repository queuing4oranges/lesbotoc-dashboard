import { toast } from 'react-toastify';
import { apiClient } from '../../../api';

// Edit an event
export async function editEvent(id, values, toggle, setSuccess) {
	// Convert value to tinyint for DB
	if (values) {
		values.signup === false ? values.signup = 0 : values.signup = 1
	}
	try {
		const response = await apiClient.put(`events/update.php/${id}`, { ...values, id });

		if (response.status === 200) {
			toggle();
			toast('⭐ Well done! You edited an event!');
			setSuccess(true);
		} else {
			throw new Error(`Something went wrong. Response status: ${response.status}`);
		}
	} catch {
		toast.error('Could not edit the event.');
		setSuccess(false);
	}
};
