import React from 'react';
import { Col, Row } from 'react-bootstrap';
import AddProductForm from '../ui/AddProductForm';
import ProductCard from '../ui/ProductCard';
import { useProducts } from '../providers/ProductContext';

export default function MainPage(): JSX.Element {
  const { products } = useProducts();
  return (
    <Row>
      <Col xs={12}>
        <AddProductForm />
      </Col>
      {products.map((product) => (
        <Col key={product.id} xs={4}>
          <ProductCard product={product}/>
        </Col>
      ))}
    </Row>
  );
}
