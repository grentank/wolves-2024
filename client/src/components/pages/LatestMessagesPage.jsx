import React, { useEffect, useState } from 'react';
import { Button, Col, Row } from 'reactstrap';
import MessageCard from '../ui/MessageCard';
import AddMessageForm from '../ui/AddMessageForm';
import axios from 'axios';
import axiosInstance from '../../service/axiosInstance';
import Loader from '../hoc/Loader';

export default function LatestMessagesPage({ user }) {
  const [messages, setMessages] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);

  const submitHandler = async (event) => {
    event.preventDefault(); // предотвращение перезагрузки страницы
    const form = event.target;
    const formData = new FormData(form);
    const dataFromForm = Object.fromEntries(formData); // data - объект с данными формы
    form.reset(); // очистка полей формы
    console.log({ dataFromForm });
    // Отправить данные на бекенд
    try {
      const response = await axiosInstance.post('/messages', dataFromForm);
      const newMessage = response.data; // Получили новые данные с бека
      setMessages((prev) => [newMessage, ...prev]); // Отобразили их
    } catch (error) {
      const message = error?.response?.data?.text;
      alert(message || 'Возникла ошибка');
    }
  };

  useEffect(() => {
    axiosInstance('/messages')
      .then((res) => setMessages(res.data))
      .catch(console.log)
      .finally(() => setLoading(false));
  }, []);

  const deleteHandler = async (messageId) => {
    const response = await axiosInstance.delete(`/messages/${messageId}`);
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
      <Loader isLoading={loading}>
        {messages.map((message) => (
          <Col xs="12" key={message.id}>
            <MessageCard user={user} message={message} deleteHandler={deleteHandler} />
          </Col>
        ))}
      </Loader>
    </Row>
  );
}
