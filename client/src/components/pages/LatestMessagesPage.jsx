import React, { useEffect, useState } from 'react';
import { Button, Col, Row } from 'reactstrap';
import MessageCard from '../ui/MessageCard';
import AddMessageForm from '../ui/AddMessageForm';
import axios from 'axios';

export default function LatestMessagesPage() {
  const [messages, setMessages] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const submitHandler = async (event) => {
    event.preventDefault(); // предотвращение перезагрузки страницы
    const form = event.target;
    const formData = new FormData(form);
    const dataFromForm = Object.fromEntries(formData); // data - объект с данными формы
    form.reset(); // очистка полей формы
    console.log({ dataFromForm });
    // Отправить данные на бекенд
    try {
      const response = await axios.post('/api/messages', dataFromForm);
      const newMessage = response.data; // Получили новые данные с бека
      setMessages((prev) => [newMessage, ...prev]); // Отобразили их
    } catch (error) {
      const message = error?.response?.data?.text;
      alert(message || 'Возникла ошибка');
    }
  };

  useEffect(() => {
    fetch('/api/messages')
      .then((res) => res.json())
      .then((data) => setMessages(data))
      .catch(console.log);
  }, []);

  const deleteHandler = async (messageId) => {
    const response = await axios.delete(`/api/messages/${messageId}`);
    if (response.status === 200) {
      setMessages((prev) => prev.filter((message) => message.id !== messageId));
    }
  };

  return (
    <Row>
      <Col xs="4">
        <Button onClick={() => setShowForm((p) => !p)}>
          {showForm ? 'Рас' : 'C'}крыть форму
        </Button>
      </Col>
      <Col xs="8">{showForm && <AddMessageForm submitHandler={submitHandler} />}</Col>
      {/* <Button onClick={() => setCounter((p) => p + 1)}>Счётчик {counter}</Button> */}
      {messages.map((message) => (
        <Col xs="12" key={message.id}>
          <MessageCard message={message} deleteHandler={deleteHandler} />
        </Col>
      ))}
    </Row>
  );
}
