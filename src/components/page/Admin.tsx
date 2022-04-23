import React, { useEffect } from 'react';
import { Box, Button, Flex, Heading, Spinner, Text } from '@chakra-ui/react';
import useSWR from 'swr';
import { Radio } from '@/types/radikoProgram';
import { fetcher } from '../../util/fetcher';

export const Admin: React.FC = () => {
  const { data } = useSWR<Radio[]>(`/api/RadikoProgram`, fetcher);

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <>
      <Heading as={'h1'} display={'flex'} justifyContent={'center'}>
        管理者画面
      </Heading>
      <Box mt={'20'}>
        {data ? (
          <>
            <Text
              display={'flex'}
              justifyContent={'center'}
              fontSize={'xl'}
              fontWeight={'bold'}
            >
              {data.length}件の番組がヒット
            </Text>
            <Flex justify={'center'} mt={'10'}>
              <Button colorScheme={'orange'}>番組を登録</Button>
            </Flex>
          </>
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
