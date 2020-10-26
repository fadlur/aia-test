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
  Container
} from 'reactstrap';

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

const Header = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);
  
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
                <BsNavLink title='Home' href='/' />
              </NavItem>
              <NavItem>
                <BsNavLink title='Alur' href='/alur' />
              </NavItem>
              <NavItem>
                <BsNavLink title='FAQ' href='/faq' />
              </NavItem>
              <NavItem>
                <BsNavLink title='Kontak' href='/kontak' />
              </NavItem>
              <NavItem>
                <BsNavLink title='Login' href='/login' />
              </NavItem>
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default Header;