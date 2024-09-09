import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  Button,
  Collapse,
  Nav,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  NavItem,
} from 'reactstrap';

export default function NavigationBar({ user, logoutHandler }) {
  const [open, setOpen] = useState(false);
  return (
    <Navbar className="my-2 navbar-expand-md" color="dark" dark>
      <NavbarBrand href="/">
        {user ? `Привет, ${user.name}` : 'Анонимная платформа'}
      </NavbarBrand>
      <NavbarToggler onClick={() => setOpen(!open)} />
      <Collapse expand="xs" isOpen={open} navbar>
        <Nav className="me-auto" navbar>
          <NavItem>
            <NavLink className="nav-link" to="/">
              Главная
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink className="nav-link" to="/latest">
              Последние посты
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink className="nav-link" to="/login">
              Вход
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink className="nav-link" to="/signup">
              Регистрация
            </NavLink>
          </NavItem>
          <NavItem>
            <Button onClick={logoutHandler}>Выйти</Button>
          </NavItem>
        </Nav>
      </Collapse>
    </Navbar>
  );
}
