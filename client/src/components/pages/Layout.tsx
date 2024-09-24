import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';
import InfoToast from '../ui/InfoToast';

export default function Layout(): JSX.Element {
  return (
    <Container>
      <Row>
        <Col xs={12}>
          <h1>Навигация</h1>
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <Outlet />
        </Col>
      </Row>
      <InfoToast />
    </Container>
  );
}
