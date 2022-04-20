import React from 'react';
import firebase from 'firebase/app';
import { Box, Button, Heading } from '@chakra-ui/react';
import { FcGoogle } from 'react-icons/fc';
import { auth } from '../../firebase';
import { useRouter } from 'next/router';
import { useMessage } from '../../hooks/useMessage';

export const Login: React.FC = () => {
  const router = useRouter();
  const { openMessage } = useMessage();

  const signInWithGoogle = () => {
    const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
    googleAuthProvider.setCustomParameters({ prompt: 'select_account' });
    auth
      .signInWithPopup(googleAuthProvider)
      .then((result) => {
        router.push('/');
        if (result.additionalUserInfo?.isNewUser) {
          openMessage('アカウントが作成されました！', 'success');
        } else {
          openMessage('ログインしました！', 'success');
        }
      })
      .catch(() => {
        openMessage('ログインに失敗しました', 'error');
      });
  };

  return (
    <Box textAlign={'center'}>
      <Heading>Login</Heading>
      <Button
        leftIcon={<FcGoogle size={18} />}
        boxShadow={'md'}
        bgColor={'white'}
        color={'blackAlpha.700'}
        fontFamily={'Roboto'}
        fontSize={14}
        px={8}
        py={6}
        mt={4}
        onClick={signInWithGoogle}
      >
        Googleでログイン
      </Button>
    </Box>
  );
};
