import React from 'react';
import { Box, Container, Flex } from '@chakra-ui/react';
import { CommonHeader } from '../UIkit/CommonHeader';
import { CommonFooter } from '../UIkit/CommonFooter';

type Props = {
  children: React.ReactNode;
};

export const CommonLayout: React.VFC<Props> = ({ children }) => {
  return (
    <Flex direction="column" minH="100vh">
      <CommonHeader />
      <Box as="main" flex="1">
        <Container maxW="1400px">{children}</Container>
      </Box>
      <CommonFooter />
    </Flex>
  );
};
