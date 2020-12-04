/* eslint-disable react/jsx-pascal-case */
import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import UserForm from 'src/components/UserForm';
import Header from 'src/components/Header';
import axios from 'axios';

import styles from 'src/css/styles.module.css';

interface IUser {
  id: number;
  role: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  createdAt: string;
  updatedAt: string;
  active: boolean;
}

interface IResponse {
  success: boolean;
  message: string;
}

const Admin = (): JSX.Element => {
  const [alert, setAlert] = useState({ visible: false, message: '', variant: 'info' });
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const res = (await axios.get('api/user/getUsers')).data;
      setUsers(res.users.filter((user: IUser) => user.role !== 'admin'));
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit = async (userEmail: string, password: string, role: string, firstName: string, lastName: string) => {
    try {
      const res = (
        await axios.post('api/user/addUser', {
          userEmail,
          password,
          role,
          firstName,
          lastName,
        })
      ).data;
      console.log(res);
      if (res.success) {
        fetchUsers();
      }
      setAlert({ visible: true, message: res.message, variant: res.success ? 'success' : 'danger' });
    } catch (error) {
      console.log(error);
    }
  };

  const onRemoveClick = async (id: number) => {
    try {
      const res: IResponse = (await axios.post('api/user/deleteUser', { id })).data;
      console.log('Remove', res);
      if (res.success) {
        setAlert({ visible: true, message: res.message, variant: 'warning' });
        fetchUsers();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <>
      <Header />
      <Container className={styles.adminContainer}>
        <Table striped bordered hover size="sm" className={styles.userTable}>
          <thead>
            <tr>
              <th>#</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user: IUser) => (
              <tr key={`${user.id}`}>
                <td>{user.id}</td>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.email}</td>
                <td>
                  <Button variant="danger" onClick={() => onRemoveClick(user.id)}>
                    Remove
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {alert.visible && (
            <Alert
              key="alert"
              variant={alert.variant}
              onClose={() => setAlert({ visible: false, message: '', variant: '' })}
              dismissible
            >
              {alert.message}
            </Alert>
          )}
          <UserForm onSubmit={onSubmit} />
        </div>
      </Container>
    </>
  );
};
export default Admin;
