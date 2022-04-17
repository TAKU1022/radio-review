import { useToast } from '@chakra-ui/react';

export const useMessage = () => {
  const toast = useToast();

  const openMessage = (
    title: string,
    status: 'info' | 'warning' | 'success' | 'error' | undefined
  ) => {
    toast({ title, status, duration: 3000, isClosable: true });
  };

  return {
    openMessage,
  };
};
