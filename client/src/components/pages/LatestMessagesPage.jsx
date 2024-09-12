import React, { useState } from 'react';
import { Button, Col, Row } from 'reactstrap';
import MessageCard from '../ui/MessageCard';
import AddMessageForm from '../ui/AddMessageForm';
import Loader from '../hoc/Loader';
import useMessages from '../../hooks/useMessages';

export default function LatestMessagesPage() {
  const [showForm, setShowForm] = useState(false);

  // MESSAGES STATE
  const { messages, loading, submitHandler, deleteHandler, error } = useMessages();

  if (error) return <h5>Возникла ошибка. Попробуйт перезагрузить страницу</h5>;

  return (
    <Row>
      <Col xs="4">
        <Button onClick={() => setShowForm((p) => !p)}>
          {showForm ? 'Рас' : 'C'}крыть форму
        </Button>
      </Col>
      <Col xs="8">{showForm && <AddMessageForm submitHandler={submitHandler} />}</Col>
      {/* <Button onClick={() => setCounter((p) => p + 1)}>Счётчик {counter}</Button> */}
      <Loader isLoading={loading}>
        {messages.map((message) => (
          <Col xs="12" key={message.id}>
            <MessageCard message={message} deleteHandler={deleteHandler} />
          </Col>
        ))}
      </Loader>
    </Row>
  );
}
