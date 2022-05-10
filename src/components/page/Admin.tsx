import React, { useState } from 'react';
import {
  Box,
  Button,
  Center,
  Flex,
  Grid,
  GridItem,
  Heading,
  Image,
  Link,
  ListItem,
  Select,
  Spinner,
  Text,
  UnorderedList,
} from '@chakra-ui/react';
import useSWR from 'swr';
import { Radio } from '@/types/radikoProgram';
import { fetcher } from '../../utility/fetcher';
import { createRadio } from '../../firebase/db/radio';
import stationData from '../../data/station.json';
import { useForm } from 'react-hook-form';
import { CheckCircleIcon } from '@chakra-ui/icons';
import { useMessage } from '../../hooks/useMessage';

type FormData = {
  regionName: string;
  stationId: string;
};

export const Admin: React.FC = () => {
  const { openMessage } = useMessage();
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

  const onClickCreateRadio = (radioList: Omit<Radio, 'radioId'>[]) => {
    const radioPromiseList: Promise<void>[] = radioList.map(
      (radio: Omit<Radio, 'radioId'>) => createRadio(radio)
    );
    Promise.all(radioPromiseList).then(() => {
      changeSelectedRadioList([]);
      openMessage('番組を登録しました', 'success');
    });
  };

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
                    <Box pos={'sticky'} top={'100px'} w={60}>
                      <Text fontSize={'2xl'} fontWeight={'bold'}>
                        選択した番組
                      </Text>
                      {selectedRadioList.length !== 0 && (
                        <>
                          <UnorderedList mt={6}>
                            {selectedRadioList.map(
                              (radio: Omit<Radio, 'radioId'>) => (
                                <ListItem key={radio.title} mt={2}>
                                  {radio.title}
                                </ListItem>
                              )
                            )}
                          </UnorderedList>
                          <Center mt={6}>
                            <Button
                              colorScheme={'orange'}
                              onClick={() =>
                                onClickCreateRadio(selectedRadioList)
                              }
                            >
                              番組を登録
                            </Button>
                          </Center>
                        </>
                      )}
                    </Box>
                  </Box>
                  <Grid as={'ul'} templateColumns="repeat(3, 1fr)" gap={4}>
                    {data.map(
                      (radio: Omit<Radio, 'radioId'>, index: number) => (
                        <GridItem
                          key={index}
                          as={'li'}
                          w={'100%'}
                          overflow={'hidden'}
                          pos={'relative'}
                          bgColor={
                            selectedRadioList.includes(radio) ? 'gray.300' : ''
                          }
                        >
                          {selectedRadioList.includes(radio) && (
                            <CheckCircleIcon
                              color={'orange.400'}
                              w={10}
                              h={10}
                              pos={'absolute'}
                              top={0}
                              right={0}
                              zIndex={1}
                            />
                          )}
                          <Image
                            src={radio.img}
                            alt={radio.title}
                            w={'100%'}
                            cursor={'pointer'}
                            opacity={
                              selectedRadioList.includes(radio) ? 0.6 : 1
                            }
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
                            <Text>{radio.pfm}</Text>
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
                      )
                    )}
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
