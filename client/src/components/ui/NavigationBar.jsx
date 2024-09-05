import React, { useState } from 'react';
import {
  Collapse,
  Nav,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  NavItem,
  NavLink,
} from 'reactstrap';

export default function NavigationBar() {
  const [open, setOpen] = useState(false);
  return (
    <Navbar className="my-2" color="dark" dark>
      <NavbarBrand href="/">Анонимный платформа</NavbarBrand>
      <NavbarToggler onClick={() => setOpen(!open)} />
      <Collapse expand="xs" isOpen={open} navbar>
        <Nav className="me-auto" navbar>
          <NavItem>
            <NavLink href="/">Главная</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/latest">Последние посты</NavLink>
          </NavItem>
        </Nav>
      </Collapse>
    </Navbar>
  );
}
