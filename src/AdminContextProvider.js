import React, { createContext, useState } from 'react';

export const AdminContext = createContext();

const AdminContextProvider = ({ children }) => {
	const [contacts, setContacts] = useState([]);
	const [events, setEvents] = useState([]);
	const [selectedEvent, setSelectedEvent] = useState(false);
	const [success, setSuccess] = useState(false);
	const [selectedContact, setSelectedContact] = useState(false);
	
	return (
		<AdminContext.Provider 
			value={{
				contacts,
				setContacts,
				events,
				setEvents,
				success,
				setSuccess,
				selectedContact,
				setSelectedContact,
				selectedEvent,
				setSelectedEvent
			}}
		>
			{children}
		</AdminContext.Provider>
	);
};

export default AdminContextProvider;