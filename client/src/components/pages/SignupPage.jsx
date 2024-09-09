import axios from 'axios';
import React, { useState } from 'react';
import { Form } from 'react-router-dom';
import { Button, FormFeedback, FormGroup, Input, Label } from 'reactstrap';

export default function SignupPage({ signupHandler }) {
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    password: '',
    repeat: '',
  });
  const changeHandler = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  return (
    <Form onSubmit={(event) => signupHandler(event, formData)}>
      <FormGroup>
        <Label for="emailInp">Email</Label>
        <Input
          value={formData.email}
          onChange={changeHandler}
          id="emailInp"
          name="email"
          placeholder="Введи email"
          type="email"
        />
      </FormGroup>
      <FormGroup>
        <Label for="nameInp">Имя</Label>
        <Input
          value={formData.name}
          onChange={changeHandler}
          id="nameInp"
          name="name"
          placeholder="Кто ты"
          type="text"
        />
      </FormGroup>
      <FormGroup>
        <Label for="pass">Пароль</Label>
        <Input
          value={formData.password}
          onChange={changeHandler}
          id="pass"
          name="password"
          placeholder="Пароль"
          type="password"
        />
      </FormGroup>
      <FormGroup>
        <Label for="repeatPass">Повтор пароля</Label>
        <Input
          invalid={formData.repeat.length > 0 && formData.repeat !== formData.password}
          value={formData.repeat}
          onChange={changeHandler}
          id="repeatPass"
          name="repeat"
          placeholder="Повтори пароль"
          type="password"
        />
        <FormFeedback>Пароли должны совпадать</FormFeedback>
      </FormGroup>
      <Button>Submit</Button>
    </Form>
  );
}
