import './App.scss';
import { ToastContainer } from 'react-toastify';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

import ContactsContainer from './components/contacts/ContactsContainer';
import AdminLogin from '../src/components/admin/AdminLogin';
import EventsArchive from '../src/components/admin/events/EventsArchive';
import ImageUpload from '../src/components/admin/pictures/ImageUpload';
import More from '../src/components/admin/more/More';
import EventsContainer from './components/admin/events/EventsContainer';

function App() {
	return (
		<div className='App w-100'>
			<ToastContainer
				position="top-center"
				autoClose={2000}
				closeOnClick
				pauseOnHover
				theme='light'
				icon={false}
			/>
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
