import React from 'react';
import { Box, Container, Flex } from '@chakra-ui/react';
import { CommonHeader } from '../UIkit/CommonHeader';
import { CommonFooter } from '../UIkit/CommonFooter';

type Props = {
  children: React.ReactNode;
};

export const CommonLayout: React.VFC<Props> = ({ children }) => {
  return (
    <Flex direction={'column'} minH={'100vh'} bgColor={'gray.50'}>
      <CommonHeader />
      <Box as={'main'} flex={1}>
        <Container maxW={'1350px'} pt={10}>
          {children}
        </Container>
      </Box>
      <CommonFooter />
    </Flex>
  );
};
