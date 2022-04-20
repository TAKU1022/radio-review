import React, { useEffect } from 'react';
import NextLink from 'next/link';
import {
  Avatar,
  Flex,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spacer,
} from '@chakra-ui/react';
import { useUser } from '../../hooks/useUser';
import { auth } from '../../firebase';
import { useRouter } from 'next/router';
import { useMessage } from '../../hooks/useMessage';

export const CommonHeader: React.FC = () => {
  const router = useRouter();
  const { user, firebaseUser } = useUser();
  const { openMessage } = useMessage();

  const signOut = () => {
    auth.signOut().then(() => {
      router.push('/');
      openMessage('ログアウトに成功しました', 'success');
    });
  };

  useEffect(() => {
    console.log(firebaseUser);
  }, [firebaseUser]);

  return (
    <Flex
      as={'header'}
      bgColor={'blue.300'}
      pos={'sticky'}
      top={0}
      px={8}
      align={'center'}
      h={16}
    >
      <Flex>
        <NextLink href="/" passHref>
          <Link
            color={'white'}
            fontSize={'x-large'}
            lineHeight={1}
            fontWeight={'bold'}
          >
            Radio Review
          </Link>
        </NextLink>
      </Flex>
      <Spacer />
      <Flex>
        {firebaseUser ? (
          <Menu>
            <MenuButton>
              <Avatar name={user?.name} src={user?.avatarURL} size={'sm'} />
            </MenuButton>
            <MenuList>
              <MenuItem onClick={signOut}>ログアウト</MenuItem>
            </MenuList>
          </Menu>
        ) : (
          <NextLink href="/login" passHref>
            <Link color={'white'} fontWeight={'bold'}>
              ログイン
            </Link>
          </NextLink>
        )}
      </Flex>
    </Flex>
  );
};
