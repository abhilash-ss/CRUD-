// @flow
import React, { ReactNode } from 'react';
import BootstrapContainer from 'react-bootstrap/Container';

type Props = {
  children: ReactNode;
};
const Container = ({ children }: Props): JSX.Element => {
  return (
    <BootstrapContainer style={{ maxWidth: '1246px', width: '90vw', paddingTop: 15 }} fluid>
      {children}
    </BootstrapContainer>
  );
};

export default Container;
