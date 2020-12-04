import React, { FunctionComponent, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

interface IProps {
  onSubmit: (email: string, password: string) => void;
}
// eslint-disable-next-line react/prop-types
const LoginForm: FunctionComponent<IProps> = ({ onSubmit }) => {
  const [email, setEmail] = useState('');
  const [password, setPassWord] = useState('');

  return (
    <Card>
      <Card.Body>
        <Form>
          <Form.Group
            controlId="formBasicEmail"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          >
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
          </Form.Group>

          <Form.Group
            controlId="formBasicPassword"
            onChange={(e) => {
              setPassWord(e.target.value);
            }}
          >
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
          <Button
            variant="primary"
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              onSubmit(email, password);
            }}
          >
            Submit
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default LoginForm;
