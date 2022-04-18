import React from 'react';
import NextLink from 'next/link';
import { Box, Flex, Link, Spacer } from '@chakra-ui/react';

export const CommonHeader: React.VFC = () => {
  return (
    <Flex
      as={'header'}
      color={'white'}
      bgColor={'blue.300'}
      pos={'sticky'}
      top={0}
      px={8}
      py={4}
      align={'center'}
    >
      <Flex>
        <NextLink href="/" passHref>
          <Link fontSize={'x-large'} lineHeight={1} fontWeight={'bold'}>
            Radio Review
          </Link>
        </NextLink>
      </Flex>
      <Spacer />
      <Flex>
        <NextLink href="/login" passHref>
          <Link fontWeight={'bold'}>ログイン</Link>
        </NextLink>
      </Flex>
    </Flex>
  );
};
