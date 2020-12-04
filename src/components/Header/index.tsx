import React, { FunctionComponent } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import { useRouter } from 'next/router';
import axios from 'axios';

const Header: FunctionComponent = () => {
  const router = useRouter();
  const logOutuser = async () => {
    console.log('logoutUser');
    try {
      const res = (await axios.post('api/auth/logout')).data;
      if (res.success) {
        router.push('/');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Navbar bg="light" expand="lg" className="bg-light justify-content-between">
      <Navbar.Brand href="#">CRUD APPLICATION</Navbar.Brand>
      <Button variant="danger" onClick={logOutuser}>
        Logout
      </Button>
    </Navbar>
  );
};

export default Header;
