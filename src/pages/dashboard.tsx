/* eslint-disable react/jsx-pascal-case */
import React, { useEffect, useState } from 'react';
import Container from 'src/components/Container';

const Dashboard = (): JSX.Element => {
  const [role, setRole] = useState('');

  useEffect(() => {
    setRole(localStorage.getItem('role'));
  }, []);

  return <Container>Role : {role}</Container>;
};

export default Dashboard;
