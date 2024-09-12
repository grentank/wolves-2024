import React, { useEffect, useState } from 'react';
import axiosInstance from '../../service/axiosInstance';
import { Col, Row } from 'reactstrap';
import MessageCard from '../ui/MessageCard';

export default function EffectPage() {
  const [value, setValue] = useState('');
  const onChange = ({ target }) => setValue(target.value);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const timerId = setTimeout(() => {
      if (value !== '') {
        axiosInstance(`/messages/search?search=${value}`).then((res) =>
          setMessages(res.data),
        );
      }
    }, 1000);
    return () => clearTimeout(timerId);
  }, [value]);
  return (
    <div>
      <input type="text" value={value} onChange={onChange} />
      <Row>
        {messages.map((message) => (
          <Col xs="12" key={message.id}>
            <MessageCard message={message} deleteHandler={() => {}} />
          </Col>
        ))}
      </Row>
    </div>
  );
}
