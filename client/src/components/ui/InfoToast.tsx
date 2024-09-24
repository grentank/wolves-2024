import React from 'react';
import Toast from 'react-bootstrap/Toast';
import { useAppDispatch, useAppSelector } from '../providers/redux/hooks';
import { setError } from '../providers/redux/slices/productSlice';

export default function InfoToast(): JSX.Element {
  const error = useAppSelector((store) => store.products.error);
  const dispatch = useAppDispatch();
  return (
    <Toast
      style={{
        position: 'absolute',
        top: 20,
        right: 20,
        zIndex: 1060,
      }}
      onClose={() => dispatch(setError(null))}
      show={!!error}
      delay={3000}
      autohide
      bg="danger"
    >
      <Toast.Header>
        <strong className="me-auto">Ошибка</strong>
        <small>Только что</small>
      </Toast.Header>
      <Toast.Body className="text-white">{error || 'Неизвестная ошибка'}</Toast.Body>
    </Toast>
  );
}
