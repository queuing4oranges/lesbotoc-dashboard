import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

import {
	Navbar, Nav, NavItem,
	NavbarToggler, Button,
	Collapse
} from 'reactstrap';

import { navLinks } from '../Datalists';
import './AdminNavbar.scss';

export default function AdminNavbar() {
	const [isOpen, setIsOpen] = useState(false);
	const toggle = () => setIsOpen(!isOpen);

	return (
		<Navbar expand='md' className='admin-navbar'>
			<NavbarToggler onClick={toggle}/>
			<Collapse isOpen={isOpen} navbar>
			<Nav className='ms-auto d-md-flex align-items-center' navbar>
				{navLinks && navLinks.map((link, idx) => (
				<NavItem key={idx}>
					<NavLink className='nav-link' to={link.to}>{link.name}</NavLink>
				</NavItem>
				))}
				<NavItem>
					<a href='/' className='nav-link nav-item-burger'>
						<Button outline color='danger'>Logout</Button>
					</a>
				</NavItem>
			</Nav>
			</Collapse>
		</Navbar>
	);
}
