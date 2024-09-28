import React from 'react';
import { Button, Card, CloseButton } from 'react-bootstrap';
import type { ProductT } from '../../schemas/productSchema';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { deleteProductThunk } from '../../redux/slices/product/productThunks';
import {
  addToFavorites,
  openProductModal,
} from '../../redux/slices/product/productSlice';
import HeartFilled from './icons/HeartFilled';
import HeartOutline from './icons/HeartOutline';
import { useDeleteProductMutation } from '../../redux/api/productApi';

type ProductCardProps = {
  product: ProductT;
  cardOptions: { order: string; key: string };
  handleDelete: (id: number) => void;
};

function ProductCard({
  product,
  cardOptions,
  handleDelete,
}: ProductCardProps): JSX.Element {
  const dispatch = useAppDispatch();
  const isFav = useAppSelector(
    (store) => !!store.products.favorites.find((p) => p.id === product.id),
  );
  // const isFav = !!favs.find((p) => p.id === product.id);
  console.log('render');
  // const [deleteProduct] = useDeleteProductMutation();
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={product.image ?? '/images/no-image.png'} />
      <Card.ImgOverlay className="justify-content-between align-items-start d-flex">
        <Button variant="danger" onClick={() => void dispatch(addToFavorites(product))}>
          {isFav ? <HeartFilled /> : <HeartOutline />}
        </Button>
        <Button onClick={() => void dispatch(openProductModal(product))}>Р</Button>
        <CloseButton onClick={() => void handleDelete(product.id)} />
      </Card.ImgOverlay>
      <Card.Body>
        <Card.Subtitle className="mb-2 text-muted">
          {product.title} - {product.User.name}
        </Card.Subtitle>
        <Card.Title style={{ color: cardOptions.key === 'price' ? 'red' : 'black' }}>
          {product.price} руб
        </Card.Title>
        <Card.Text>{product.description ?? 'Описание не добавлено'}</Card.Text>
      </Card.Body>
    </Card>
  );
}

export default React.memo(ProductCard);
