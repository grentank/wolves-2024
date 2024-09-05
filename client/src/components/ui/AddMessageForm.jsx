import React from 'react';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';

export default function AddMessageForm({ submitHandler }) {
  return (
    <Form onSubmit={submitHandler}>
      <FormGroup>
        <Label for="signature">Кто ты</Label>
        <Input
          id="signature"
          name="signature"
          placeholder="Можно оставить пустым"
          type="text"
        />
      </FormGroup>
      <FormGroup>
        <Label for="text">Текст сообщения</Label>
        <Input id="text" name="text" type="textarea" placeholder="Напиши что-либо" />
      </FormGroup>
      <Button type="submit">Запостить</Button>
    </Form>
  );
}
