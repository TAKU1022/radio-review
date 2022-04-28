import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Heading,
  Image,
  Link,
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
  const { register, watch, handleSubmit, formState } = useForm<FormData>();
  const regionSelectValue = watch('regionName');
  const [stationId, changeStationId] = useState<string>('');
  const { data } = useSWR<Omit<Radio, 'radioId'>[]>(
    `/api/RadikoProgram/${stationId ? stationId : ''}`,
    fetcher
  );
  const [selectedRadioList, changeSelectedRadioList] = useState<
    Omit<Radio, 'radioId'>[]
  >([]);

  const onSubmit = (formData: FormData) => {
    changeStationId(formData.stationId);
  };

  const onClickProgram = (radio: Omit<Radio, 'radioId'>) => {
    if (selectedRadioList.includes(radio)) {
      changeSelectedRadioList((prevState) => [
        ...prevState.filter((radioData) => radioData !== radio),
      ]);
    } else {
      changeSelectedRadioList((prevState) => [...prevState, radio]);
    }
  };

  useEffect(() => {
    console.log(selectedRadioList);
  }, [selectedRadioList]);

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
              disabled={!regionSelectValue}
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
                  fontSize={'2xl'}
                  fontWeight={'bold'}
                >
                  {data.length}件の番組がヒット
                </Text>
                <Flex mt={8}>
                  <Box flexShrink={0} mr={10}>
                    <Box pos={'sticky'} top={'100px'} w={44}>
                      <Text fontSize={'2xl'} fontWeight={'bold'}>
                        選択した番組
                      </Text>
                    </Box>
                  </Box>
                  <Grid templateColumns="repeat(3, 1fr)" gap={4}>
                    {data.map((radio: Omit<Radio, 'radioId'>) => (
                      <GridItem
                        key={radio.title}
                        w={'100%'}
                        overflow={'hidden'}
                        bgColor={
                          selectedRadioList.includes(radio) ? 'gray.300' : ''
                        }
                      >
                        <Image
                          src={radio.img}
                          alt={radio.title}
                          w={'100%'}
                          cursor={'pointer'}
                          opacity={selectedRadioList.includes(radio) ? 0.6 : 1}
                          _hover={{ opacity: 0.6 }}
                          onClick={() => onClickProgram(radio)}
                        />
                        <Box p={2}>
                          <Text
                            fontSize={'lg'}
                            fontWeight={'bold'}
                            cursor={'pointer'}
                            opacity={
                              selectedRadioList.includes(radio) ? 0.6 : 1
                            }
                            _hover={{ opacity: 0.6 }}
                            onClick={() => onClickProgram(radio)}
                          >
                            {radio.title}
                          </Text>
                          <Link
                            href={radio.url}
                            target="_blank"
                            rel="noreferrer"
                            color={'blue.300'}
                          >
                            {radio.url}
                          </Link>
                        </Box>
                      </GridItem>
                    ))}
                  </Grid>
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
