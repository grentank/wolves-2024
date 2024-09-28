import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, NavLink } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { UserStatusEnum } from '../../schemas/authSchema';
import { logoutThunk } from '../../redux/slices/auth/authThunks';
import PlusCircle from './icons/PlusCircle';
import { openProductModal } from '../../redux/slices/product/productSlice';

export default function Navigation(): JSX.Element {
  const user = useAppSelector((store) => store.auth.user);
  const dispatch = useAppDispatch();
  return (
    <Navbar bg="dark" data-bs-theme="dark">
      <Container>
        <Navbar.Brand href="/">
          {user.status === UserStatusEnum.logged ? user.name : 'Гость'}
        </Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link as={NavLink} to="/">
            Home
          </Nav.Link>
          {user.status === UserStatusEnum.logged ? (
            <>
              <Nav.Link as={NavLink} to="/profile">
                ЛК
              </Nav.Link>
              <Nav.Link as={Button} onClick={() => dispatch(openProductModal())}>
                <PlusCircle />
              </Nav.Link>
              <Nav.Link
                as={Link}
                onClick={(e) => {
                  e.preventDefault();
                  void dispatch(logoutThunk());
                }}
                to="/logout"
              >
                Выход
              </Nav.Link>
            </>
          ) : (
            <>
              <Nav.Link as={NavLink} to="/login">
                Вход
              </Nav.Link>
              <Nav.Link as={NavLink} to="/signup">
                Рега
              </Nav.Link>
            </>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
}
