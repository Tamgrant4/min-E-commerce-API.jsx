import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const CustomerForm = ({ onSubmit, customer }) => {
  const [name, setName] = useState(customer ? customer.name : '');
  const [email, setEmail] = useState(customer ? customer.email : '');
  const [phone, setPhone] = useState(customer ? customer.phone : '');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name, email, phone });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formName">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </Form.Group>
      <Form.Group controlId="formEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </Form.Group>
      <Form.Group controlId="formPhone">
        <Form.Label>Phone</Form.Label>
        <Form.Control
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
      </Form.Group>
      <Button variant="primary" type="submit">Submit</Button>
    </Form>
  );
};

export default CustomerForm;

import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Button, Card } from 'react-bootstrap';

const CustomerDetails = ({ deleteCustomer }) => {
  const [customer, setCustomer] = useState({});
  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    // Fetch customer details by ID from backend
    fetch(`/api/customers/${id}`)
      .then(res => res.json())
      .then(data => setCustomer(data))
      .catch(error => console.error(error));
  }, [id]);

  const handleDelete = () => {
    deleteCustomer(id);
    history.push('/customers');
  };

  return (
    <Card>
      <Card.Body>
        <Card.Title>{customer.name}</Card.Title>
        <Card.Text>Email: {customer.email}</Card.Text>
        <Card.Text>Phone: {customer.phone}</Card.Text>
        <Button variant="danger" onClick={handleDelete}>Delete</Button>
      </Card.Body>
    </Card>
  );
};

import React, { useEffect, useState } from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const mockProducts = [
        
      {
        id: 1,
        name: 'Superhero Toon Tee',
        price: 25,
        image: 'https://screenfish.net/wp-content/uploads/2015/10/super-collage.jpg
      {
        id: 2,
        name: 'Cartoon Animals Tee',
        price: 25,
        image: 'hhttps://www.vectorstock.com/royalty-free-vector/cartoon-safari-animals-vector-5097887ttps://example.com/images/cartoon-animals-tee.jpg',
      },
      {
        id: 3,
        name: 'Vintage Toon Tee',
        price: 25,
        image: 'https://elements-cover-images-0.imgix.net/666c4a34-390d-4c13-b526-2054e52e0326?auto=compress%2Cformat&fit=max&w=900&s=b4f2e0470c0a86af9ac623eb7c8044adhttps://example.com/images/vintage-toon-tee.jpg', // Replace with actual image URL
      },
    ];

    setTimeout(() => setProducts(mockProducts), 500);
  }, []);

  return (
    <Row>
      {products.map(product => (
        <Col key={product.id} sm={12} md={6} lg={4}>
          <Card className="mb-4">
            <Card.Img variant="top" src={product.image} alt={product.name} />
            <Card.Body>
              <Card.Title>{product.name}</Card.Title>
              <Card.Text>${product.price}</Card.Text>
              <Link to={`/products/${product.id}`}>
                <Button variant="primary">View Details</Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';

const OrderForm = ({ onSubmit }) => {
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [orderDate, setOrderDate] = useState('');

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(error => console.error(error));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ products: selectedProducts, orderDate });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formOrderDate">
        <Form.Label>Order Date</Form.Label>
        <Form.Control
          type="date"
          value={orderDate}
          onChange={(e) => setOrderDate(e.target.value)}
          required
        />
      </Form.Group>
      <Form.Group controlId="formProducts">
        <Form.Label>Select Products</Form.Label>
        <Form.Control
          as="select"
          multiple
          onChange={(e) => setSelectedProducts([...e.target.selectedOptions].map(opt => opt.value))}
        >
          {products.map(product => (
            <option key={product.id} value={product.id}>
              {product.name} (${product.price})
            </option>
          ))}
        </Form.Control>
      </Form.Group>
      <Button variant="primary" type="submit">Place Order</Button>
    </Form>
  );
};