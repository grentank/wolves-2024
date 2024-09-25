import React from 'react';
import { Button, Col, Row, Spinner } from 'react-bootstrap';
import AddProductForm from '../ui/AddProductForm';
import ProductCard from '../ui/ProductCard';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { reverseSort, setSortKey } from '../../redux/slices/product/productSlice';

export default function MainPage(): JSX.Element {
  // const { products } = useProducts();
  // const products: ProductT[] = [];
  const products = useAppSelector((store) => store.products.items);
  const loading = useAppSelector((store) => store.products.loading);
  const { order, key } = useAppSelector((store) => store.products.sort);
  const sortedProducts = products.toSorted((p1, p2) =>
    order === 'asc' ? p1[key] - p2[key] : p2[key] - p1[key],
  );
  const dispatch = useAppDispatch();
  return (
    <Row>
      <Col xs={12}>
        <AddProductForm />
      </Col>
      <Button onClick={() => dispatch(reverseSort())}>Поменять порядок</Button>
      <Button onClick={() => dispatch(setSortKey('price'))}>По цене</Button>
      <Button onClick={() => dispatch(setSortKey('id'))}>По id</Button>
      {loading ? (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      ) : (
        sortedProducts.map((product) => (
          <Col key={product.id} xs={4}>
            <ProductCard product={product} />
          </Col>
        ))
      )}
    </Row>
  );
}
