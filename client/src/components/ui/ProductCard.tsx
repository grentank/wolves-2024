import React from 'react';
import { Button, Card } from 'react-bootstrap';
import type { ProductT } from '../../schemas/productSchema';
import { useAppDispatch } from '../../redux/hooks';
import { deleteProductThunk } from '../../redux/slices/product/productThunks';

type ProductCardProps = {
  product: ProductT;
};

export default function ProductCard({ product }: ProductCardProps): JSX.Element {
  const dispatch = useAppDispatch();
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={product.image ?? '/images/no-image.png'} />
      <Card.Body>
        <Card.Subtitle className="mb-2 text-muted">
          {product.title} - {product.User.name}
        </Card.Subtitle>
        <Card.Title>{product.price} руб</Card.Title>
        <Card.Text>{product.description ?? 'Описание не добавлено'}</Card.Text>
        <Button
          variant="danger"
          onClick={() => void dispatch(deleteProductThunk(product.id))}
        >
          Удалить
        </Button>
      </Card.Body>
    </Card>
  );
}
