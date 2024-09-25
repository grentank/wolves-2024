import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';
import InfoToast from '../ui/InfoToast';
import Navigation from '../ui/Navigation';
import { useAppSelector } from '../../redux/hooks';

export default function Layout(): JSX.Element {
  const toasts = useAppSelector((store) => store.notification.toasts);
  return (
    <Container>
      <Row>
        <Col xs={12}>
          <Navigation />
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <Outlet />
        </Col>
      </Row>
      <div
        style={{
          position: 'fixed',
          top: 20,
          right: 20,
          zIndex: 1060,
          width: '100%',
          maxWidth: '500px',
        }}
      >
        {toasts.map((toast) => (
          <InfoToast toast={toast} key={toast.id} />
        ))}
      </div>
    </Container>
  );
}
