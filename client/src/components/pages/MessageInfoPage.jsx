import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Col, Input, Row } from 'reactstrap';
import Loader from '../hoc/Loader';
import useOneMessage from '../../hooks/useOneMessage';
import AuthContext from '../../contexts/authContext';

export default function MessageInfoPage() {
  const { user } = useContext(AuthContext);
  const { messageId } = useParams();
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState('');

  const { oneMessage, createdDate, updatedDate, handleEdit } = useOneMessage(messageId);

  useEffect(() => {
    setValue(oneMessage?.text || '');
  }, [oneMessage]);

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
              <Button
                color="success"
                onClick={() => handleEdit(value).then(() => setIsEditing((e) => !e))}
              >
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
