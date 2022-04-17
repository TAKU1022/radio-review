import React from 'react';
import firebase from 'firebase/app';
import { Box, Heading } from '@chakra-ui/react';
import { auth } from '../../firebase';
import { useRouter } from 'next/router';
import { useMessage } from '../../hooks/useMessage';

export const Login: React.VFC = () => {
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
          openMessage('おかえりなさい！', 'success');
        }
      })
      .catch(() => {
        openMessage('ログインに失敗しました', 'error');
      });
  };

  return (
    <Box>
      <Heading>Login</Heading>
    </Box>
  );
};
