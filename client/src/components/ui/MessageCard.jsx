import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, CardBody, CardHeader, CardText } from 'reactstrap';
import CrossIcon from './icons/CrossIcon';
import AuthContext from '../../contexts/authContext';

export default function MessageCard({ message, deleteHandler }) {
  const { user } = useContext(AuthContext);

  return (
    <Card className="my-2">
      <CardHeader className="d-flex justify-content-between align-items-center">
        <span>{message?.User?.name || 'DELETED'}</span>
        <Button
          disabled={user.id !== message.authorId}
          onClick={() => deleteHandler(message.id)}
        >
          <CrossIcon />
        </Button>
      </CardHeader>
      <CardBody>
        <CardText>{message.text}</CardText>
        <Link to={`/messages/${message.id}`}>Подробнее</Link>
      </CardBody>
    </Card>
  );
}
