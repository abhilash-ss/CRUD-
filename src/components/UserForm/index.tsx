import React, { FunctionComponent, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

interface IProps {
  onSubmit: (email: string, password: string, role: string, firstName: string, lastName: string) => void;
}
// eslint-disable-next-line react/prop-types
const UserForm: FunctionComponent<IProps> = ({ onSubmit }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [firstName, setFirstname] = useState('');
  const [lastName, setLastName] = useState('');

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
              setPassword(e.target.value);
            }}
          >
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
          <Form.Group
            controlId="Role"
            onChange={(e) => {
              setRole(e.target.value);
            }}
          >
            <Form.Label>Role</Form.Label>
            <Form.Control type="text" placeholder="Role" />
          </Form.Group>
          <Form.Group
            controlId="formBasicPassword"
            onChange={(e) => {
              setFirstname(e.target.value);
            }}
          >
            <Form.Label>First Name</Form.Label>
            <Form.Control type="text" placeholder="First Name" />
          </Form.Group>

          <Form.Group
            controlId="formBasicPassword"
            onChange={(e) => {
              setLastName(e.target.value);
            }}
          >
            <Form.Label>Last Name</Form.Label>
            <Form.Control type="text" placeholder="Last Name" />
          </Form.Group>
          <Button
            variant="primary"
            type="submit"
            onClick={(e: any) => {
              e.preventDefault();
              onSubmit(email, password, role, firstName, lastName);
            }}
          >
            Add User
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default UserForm;
