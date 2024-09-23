import React from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';

export default function AddProductForm():JSX.Element {
  return (
    <Form>
      <Form.Group className="mb-3" controlId="prod-title">
        <Form.Label>Название</Form.Label>
        <Form.Control type="text" placeholder="Название товара" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="prod-desc">
        <Form.Label>Описание</Form.Label>
        <Form.Control as="textarea" rows={3} placeholder="Название товара" />
      </Form.Group>
      <Row>
        <Col xs={2}>
          <Form.Group className="mb-3" controlId="prod-price">
            <Form.Label>Цена</Form.Label>
            <Form.Control type="number" placeholder="Цена" />
          </Form.Group>
        </Col>
        <Col xs={8}>
          <Form.Group className="mb-3" controlId="prod-imd">
            <Form.Label>Картинка</Form.Label>
            <Form.Control type="text" placeholder="http://..." />
          </Form.Group>
        </Col>
        <Col xs={2}>
          <Button type="submit">Добавить</Button>
        </Col>
      </Row>
    </Form>
  );
}
