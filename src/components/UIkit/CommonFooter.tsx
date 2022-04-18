import React from 'react';
import { Box, Text } from '@chakra-ui/react';

export const CommonFooter: React.VFC = () => {
  return (
    <Box as={'footer'} p={4}>
      <Text display={'flex'} justifyContent={'center'} fontSize={'md'}>
        <small>&copy;TAKU</small>
      </Text>
    </Box>
  );
};
