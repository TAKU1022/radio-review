import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import type { AppProps } from 'next/app';
import NextNProgress from 'nextjs-progressbar';
import { UserProvider } from '../contexts/UserProvider';
import '../styles/index.css';

function MyApp({ Component, pageProps }: AppProps) {
  const theme = extendTheme({
    styles: {
      global: {
        'html, body': {
          height: '100%',
        },
      },
    },
  });

  return (
    <ChakraProvider theme={theme}>
      <UserProvider>
        <NextNProgress
          color={'#319795'}
          startPosition={0.3}
          stopDelayMs={200}
          height={3}
          options={{ showSpinner: false }}
        />
        <Component {...pageProps} />
      </UserProvider>
    </ChakraProvider>
  );
}

export default MyApp;
