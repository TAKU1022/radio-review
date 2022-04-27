import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import {
  Box,
  Button,
  Flex,
  Heading,
  Select,
  Spinner,
  Text,
} from '@chakra-ui/react';
import useSWR from 'swr';
import { Radio } from '@/types/radikoProgram';
import { fetcher } from '../../util/fetcher';
import { createRadio } from '../../firebase/db/radio';
import stationData from '../../data/station.json';
import { useForm } from 'react-hook-form';

type FormData = {
  regionName: string;
  stationId: string;
};

export const Admin: React.FC = () => {
  const { register, handleSubmit, formState } = useForm<FormData>();
  const [regionSelectValue, changeRegionSelectValue] = useState<string>('');
  const [stationSelectValue, changeStationSelectValue] = useState<string>('');
  const { data } = useSWR<Omit<Radio, 'radioId'>[]>(
    `/api/RadikoProgram/${stationSelectValue}`,
    fetcher
  );

  const onChangeRegionSelect = (event: ChangeEvent<HTMLSelectElement>) => {
    changeRegionSelectValue(event.currentTarget.value);
  };

  const onSubmit = (formData: FormData) => {
    changeStationSelectValue(formData.stationId);
  };

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <>
      <Heading as={'h1'} display={'flex'} justifyContent={'center'}>
        管理者画面
      </Heading>
      <Box mt={20}>
        <Box mx={'auto'} maxW={420}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Select
              {...register('regionName', { required: true })}
              placeholder="地域を選択"
              onChange={onChangeRegionSelect}
            >
              {Array.from(
                new Set(stationData.map((station) => station.region_name))
              ).map((region_name) => (
                <option key={region_name} value={region_name}>
                  {region_name}
                </option>
              ))}
            </Select>
            <Select
              {...register('stationId', { required: true })}
              placeholder="局を選択"
              disabled={regionSelectValue === ''}
              mt={4}
            >
              {stationData
                .filter((station) => station.region_name === regionSelectValue)
                .map((station) => (
                  <option key={station.id} value={station.id}>
                    {station.name}
                  </option>
                ))}
            </Select>
            <Flex mt={6} justifyContent={'center'}>
              <Button
                type="submit"
                colorScheme={'orange'}
                isLoading={formState.isSubmitting}
              >
                番組データを取得
              </Button>
            </Flex>
          </form>
        </Box>
        {formState.isSubmitted && (
          <Box mt={14}>
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
        )}
      </Box>
    </>
  );
};
