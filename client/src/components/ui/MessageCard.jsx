import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, CardBody, CardHeader, CardText } from 'reactstrap';

export default function MessageCard({ message, deleteHandler }) {
  return (
    <Card className="my-2">
      <CardHeader>{message.authorId || 'DELETED'}</CardHeader>
      <CardBody>
        {/* <CardTitle tag="h5">Special Title Treatment</CardTitle> */}
        <CardText>{message.text}</CardText>
        <Button color="danger" onClick={() => deleteHandler(message.id)}>
          Удалить
        </Button>
        <Link to={`/messages/${message.id}`}>Подробнее</Link>
      </CardBody>
    </Card>
  );
}
