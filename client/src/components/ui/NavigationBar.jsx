import React, { useContext, useState } from 'react';
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
import AuthContext from '../../contexts/authContext';

export default function NavigationBar() {
  const { user, logoutHandler } = useContext(AuthContext);
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
          {user ? (
            <NavItem>
              <NavLink className="nav-link" to="/latest">
                Последние посты
              </NavLink>
            </NavItem>
          ) : (
            <>
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
            </>
          )}
        </Nav>
        {user && (
          <NavItem>
            <Button onClick={logoutHandler}>Выйти</Button>
          </NavItem>
        )}
      </Collapse>
    </Navbar>
  );
}
