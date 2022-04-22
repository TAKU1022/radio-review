import React, { useEffect } from 'react';
import { Box, Flex, Heading, Spinner } from '@chakra-ui/react';
import axios from 'axios';
import useSWR from 'swr';

export const Admin: React.FC = () => {
  const fetcher = (url: string) => axios.get(url).then((res) => res.data);
  const { data } = useSWR(`/api/RadikoProgram`, fetcher);

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <>
      <Heading display={'flex'} justifyContent={'center'}>
        管理者画面
      </Heading>
      <Box mt={'10'}>
        {data ? (
          <></>
        ) : (
          <Flex justify={'center'}>
            <Spinner
              thickness={'4px'}
              speed={'0.65s'}
              emptyColor={'gray.200'}
              color={'blue.300'}
              size={'xl'}
            />
          </Flex>
        )}
      </Box>
    </>
  );
};
