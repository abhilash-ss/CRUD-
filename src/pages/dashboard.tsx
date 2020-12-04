/* eslint-disable react/jsx-pascal-case */
import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Header from 'src/components/Header';

const Dashboard = (): JSX.Element => {
  const [role, setRole] = useState('');

  useEffect(() => {
    setRole(localStorage.getItem('role'));
  }, []);

  return (
    <>
      <Header />
      <Container>
        <strong>Logged in successfully!</strong>
        <strong>Role: </strong>
        {role}
      </Container>
    </>
  );
};

export default Dashboard;
