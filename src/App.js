import './App.scss';
import ContactsContainer from './components/contacts/ContactsContainer';

import { Route, Routes, BrowserRouter } from 'react-router-dom';
import AdminLogin from '../src/components/admin/AdminLogin';
import EventsArchive from '../src/components/admin/events/EventsArchive';
import ImageUpload from '../src/components/admin/pictures/ImageUpload';
import More from '../src/components/admin/more/More';
import EventsContainer from './components/admin/events/EventsContainer';
import { ToastContainer } from 'react-toastify';

function App() {
	return (
		<div className='App w-100'>
			<ToastContainer />
			<BrowserRouter basename='/'>
				<Routes>
					<Route path='/' element={<AdminLogin />} />
					<Route path='/contacts' element={<ContactsContainer />} />
					<Route path='/events' element={<EventsContainer />} />
					<Route path='/events/archive' element={<EventsArchive />} />
					<Route path='/pictures' element={<ImageUpload />} />
					<Route path='/more' element={<More />} />
					<Route path='/newcontacts' element={<ContactsContainer />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
