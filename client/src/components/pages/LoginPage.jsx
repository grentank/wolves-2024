import React, { useContext, useState } from 'react';
import { Form } from 'react-router-dom';
import { Button, FormFeedback, FormGroup, Input, Label } from 'reactstrap';
import AuthContext from '../../contexts/authContext';

export default function LoginPage() {
  const { loginHandler } = useContext(AuthContext);
  const [err, setErr] = useState(null);
  return (
    <Form onSubmit={(e) => loginHandler(e).catch(setErr)}>
      <FormGroup>
        <Label for="emailInp">Email</Label>
        <Input id="emailInp" name="email" placeholder="Введи email" type="email" />
      </FormGroup>
      <FormGroup>
        <Label for="pass">Пароль</Label>
        <Input
          id="pass"
          name="password"
          placeholder="Пароль"
          type="password"
          invalid={!!err}
        />
        <FormFeedback>Неверный пароль или почта</FormFeedback>
      </FormGroup>
      <Button>Submit</Button>
    </Form>
  );
}
