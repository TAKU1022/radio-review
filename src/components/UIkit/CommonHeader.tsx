import React from 'react';
import NextLink from 'next/link';
import {
  Avatar,
  Box,
  Flex,
  HStack,
  Link,
  Menu,
  MenuButton,
  MenuDivider,
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
      openMessage('ログアウトに成功しました', 'success');
    });
  };

  return (
    <Flex
      as={'header'}
      bgColor={'blue.300'}
      pos={'sticky'}
      top={0}
      px={8}
      align={'center'}
      h={16}
      zIndex={999}
    >
      <Flex>
        <NextLink href={'/'} passHref>
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
      <HStack spacing={4}>
        <NextLink href={'/radio_list'} passHref>
          <Link color={'white'} fontWeight={'bold'}>
            番組を探す
          </Link>
        </NextLink>
        {firebaseUser ? (
          <Box>
            <Menu>
              <MenuButton>
                <Avatar name={user?.name} src={user?.avatarURL} size={'sm'} />
              </MenuButton>
              <MenuList>
                <MenuItem onClick={signOut}>ログアウト</MenuItem>
                {user && user.isAdmin && (
                  <>
                    <MenuDivider />
                    <MenuItem onClick={() => router.push('/admin')}>
                      管理者画面
                    </MenuItem>
                  </>
                )}
              </MenuList>
            </Menu>
          </Box>
        ) : (
          <NextLink href={'/login'} passHref>
            <Link color={'white'} fontWeight={'bold'}>
              ログイン
            </Link>
          </NextLink>
        )}
      </HStack>
    </Flex>
  );
};
