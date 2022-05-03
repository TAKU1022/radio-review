import React from 'react';
import { Box, Container, Flex } from '@chakra-ui/react';
import { CommonHeader } from '../UIkit/CommonHeader';
import { CommonFooter } from '../UIkit/CommonFooter';

export const CommonLayout: React.FC = ({ children }) => {
  return (
    <Flex direction={'column'} minH={'100vh'} bgColor={'gray.50'}>
      <CommonHeader />
      <Box as={'main'} flex={1}>
        <Container maxW={'1350px'} pt={12} pb={20}>
          {children}
        </Container>
      </Box>
      <CommonFooter />
    </Flex>
  );
};
