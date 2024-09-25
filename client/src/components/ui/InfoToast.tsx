import React from 'react';
import Toast from 'react-bootstrap/Toast';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import type { ToastT } from '../../schemas/notificationTypes';
import { hideToast } from '../../redux/slices/notification/notificationSlice';

type InfoToastProps = {
  toast: ToastT;
};

export default function InfoToast({ toast }: InfoToastProps): JSX.Element {
  const dispatch = useAppDispatch();
  return (
    <Toast
      style={{
        // position: 'absolute',
        top: 20,
        right: 20,
        // zIndex: 1060,
      }}
      onClose={() => dispatch(hideToast(toast.id))}
      show={toast.show}
      delay={3000}
      autohide
      bg={toast.type}
    >
      <Toast.Header>
        <strong className="me-auto">{toast.type}</strong>
        <small>Только что</small>
      </Toast.Header>
      <Toast.Body className="text-white">{toast.text}</Toast.Body>
    </Toast>
  );
}
