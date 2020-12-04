/* eslint-disable react/jsx-pascal-case */
import React, { FunctionComponent, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Alert from 'react-bootstrap/Alert';
import LoginForm from 'src/components/LoginForm';
import axios from 'axios';
import { useRouter } from 'next/router';

import styles from 'src/css/styles.module.css';

const Home: FunctionComponent = () => {
  const [showAlert, setShowAlert] = useState(false);
  const router = useRouter();
  const onSubmit = async (email: string, password: string) => {
    try {
      const res = (await axios.post('api/auth/login', { email, password })).data;
      if (res.success) {
        localStorage.setItem('role', res.role);
        if (res.role === 'admin') {
          router.push('/admin');
        } else {
          router.push('/dashboard');
        }
      } else {
        setShowAlert(true);
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  return (
    <Container className={styles.container}>
      {showAlert && (
        <Alert key="alert" variant="danger">
          Incorrect email or password
        </Alert>
      )}
      <LoginForm onSubmit={onSubmit} />
    </Container>
  );
};
export default Home;
