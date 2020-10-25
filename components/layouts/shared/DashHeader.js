import React, { useState } from 'react';
import Link from 'next/link';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  NavbarText,
  Container,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu
} from 'reactstrap';
import Axios from 'axios';

const BsNavLink = props => {
  const { title, href } = props;
  return (
    <Link href={href}>
      <a className='nav-link'>
        {title}
      </a>
    </Link>
  )
}

const DropDownLink = props => {
  const { title, href } = props;
  return (
    <Link href={href}>
      <a className="dropdown-item" role="menuitem">
        {title}
      </a>
    </Link>
  )
}

const DashHeader = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = props;
  const toggle = () => setIsOpen(!isOpen);

  const setLogout = (e) => {
    e.preventDefault()
    Axios.post('/api/v1/user/logout')
      .then(response => {
        // console.log(response);
        window.location.pathname="/login";
      })
      .catch(err => {
        // console.log(err);
        window.location.pathname="/dashboard";
      })
  }
  return (
    <>
      <Navbar color="transparant" light expand="md">
        <Container>
          <NavbarBrand href="/">
            <img src="/logo.png" />
          </NavbarBrand>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="mr-auto" navbar>
            </Nav>
            <Nav navbar>
              <NavItem>
                <BsNavLink title='Dashboard' href='/dashboard' />
              </NavItem>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  {user.name}
                </DropdownToggle>
                <DropdownMenu right>
                  <DropDownLink href="/dashboard/profil" title="Profil"/>
                  <a className="dropdown-item" role="menuitem" onClick={setLogout} style={{cursor:"pointer"}}>Logout</a>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default DashHeader;