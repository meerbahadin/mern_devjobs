import React from 'react';
import './style.css';
import { Form, Col } from 'react-bootstrap';

const SearchForm = ({ params, onParamChange }) => {
  return (
    <Form className="mb-4 search-form">
      <Form.Row className="align-items-end">
        <Form.Group as={Col}>
          <Form.Label>Description</Form.Label>
          <Form.Control
            onChange={onParamChange}
            value={params.description}
            name="description"
          ></Form.Control>
        </Form.Group>
        <Form.Group as={Col}>
          <Form.Label>Location</Form.Label>
          <Form.Control
            onChange={onParamChange}
            value={params.location}
            name="location"
          ></Form.Control>
        </Form.Group>
      </Form.Row>
    </Form>
  );
};

export default SearchForm;
