import React from 'react';
import { Button, Card } from 'react-bootstrap';
import type { ProductT } from '../../schemas/productSchema';
import { useProducts } from '../providers/ProductContext';

type ProductCardProps = {
  product: ProductT;
};

export default function ProductCard({ product }: ProductCardProps): JSX.Element {
    const { deleteHandler } = useProducts()
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={product.image ?? '/images/no-image.png'} />
      <Card.Body>
        <Card.Subtitle className="mb-2 text-muted">{product.title}</Card.Subtitle>
        <Card.Title>{product.price} руб</Card.Title>
        <Card.Text>{product.description ?? 'Описание не добавлено'}</Card.Text>
        <Button variant="danger" onClick={() => void deleteHandler(product.id)}>Удалить</Button>
      </Card.Body>
    </Card>
  );
}
