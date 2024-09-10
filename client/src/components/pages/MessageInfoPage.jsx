import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Col, Input, Row } from 'reactstrap';
import Loader from '../hoc/Loader';
import axiosInstance from '../../service/axiosInstance';

export default function MessageInfoPage({ user }) {
  const { messageId } = useParams();
  const [oneMessage, setOneMessage] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState('');

  useEffect(() => {
    axiosInstance(`/messages/${messageId}`).then((res) => setOneMessage(res.data));
  }, []);

  useEffect(() => {
    setValue(oneMessage?.text || '');
  }, [oneMessage]);

  const createdDate = `${new Date(oneMessage?.createdAt).toLocaleDateString()} ${new Date(
    oneMessage?.createdAt,
  ).toLocaleTimeString()}`;
  const updatedDate = `${new Date(oneMessage?.updatedAt).toLocaleDateString()} ${new Date(
    oneMessage?.updatedAt,
  ).toLocaleTimeString()}`;

  const handleEdit = async () => {
    const res = await axiosInstance.patch(`/messages/${oneMessage.id}`, { text: value });
    setOneMessage(res.data);
    setIsEditing((e) => !e);
  };

  return (
    <Loader isLoading={!oneMessage}>
      <Row>
        <Col xs={6}>
          {isEditing ? (
            <Input
              // defaultValue={oneMessage?.text}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              id="text"
              name="text"
              type="textarea"
              placeholder="Напиши что-либо"
            />
          ) : (
            <h4>{oneMessage?.text}</h4>
          )}
          <p>Автор {oneMessage?.User?.name || 'DELETED'}</p>
        </Col>
        <Col xs={6}>
          <p>Создано {createdDate}</p>
          <p>Отредактировано {updatedDate}</p>
        </Col>
      </Row>
      {user.id === oneMessage?.authorId && (
        <Row>
          <Col>
            <Button onClick={() => setIsEditing((e) => !e)}>
              {isEditing ? 'Отменить изменения' : 'Редактировать'}
            </Button>
            {isEditing && (
              <Button color="success" onClick={handleEdit}>
                Сохранить
              </Button>
            )}
          </Col>
        </Row>
      )}
      {/* <Form>
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
      </Form> */}
    </Loader>
  );
}
