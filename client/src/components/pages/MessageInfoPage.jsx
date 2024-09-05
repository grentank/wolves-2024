import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Form, FormGroup, Input, Label, Spinner } from 'reactstrap';

export default function MessageInfoPage() {
  const { messageId } = useParams();
  const [oneMessage, setOneMessage] = useState(null);

  useEffect(() => {
    axios(`/api/messages/${messageId}`).then((res) => setOneMessage(res.data));
  }, []);

  if (!oneMessage) return <Spinner>Loading...</Spinner>;

  return (
    <Form>
      <FormGroup>
        <Label for="signature">Кто ты</Label>
        <Input
          id="signature"
          name="signature"
          placeholder="Можно оставить пустым"
          type="text"
          defaultValue={oneMessage?.signature}
        />
      </FormGroup>
      <FormGroup>
        <Label for="text">Текст сообщения</Label>
        <Input
          defaultValue={oneMessage?.text}
          id="text"
          name="text"
          type="textarea"
          placeholder="Напиши что-либо"
        />
      </FormGroup>
      <Button type="submit">Изменить</Button>
    </Form>
  );
}
