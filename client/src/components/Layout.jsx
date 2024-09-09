import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import { Outlet } from 'react-router-dom';
import NavigationBar from './ui/NavigationBar';

export default function Layout({ user, logoutHandler }) {
  return (
    <Container>
      <Row>
        <Col xs="12">
          <NavigationBar user={user} logoutHandler={logoutHandler} />
        </Col>
      </Row>
      <Row>
        <Col xs="12">
          <Outlet />
        </Col>
      </Row>
    </Container>
  );
}
