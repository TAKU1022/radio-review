import React from 'react';
import {
  Box,
  Button,
  Center,
  Divider,
  Flex,
  Heading,
  HStack,
  Image,
  Tag,
  Text,
} from '@chakra-ui/react';
import { Radio } from '@/types/radikoProgram';
import style from '../../styles/RadioDetail.module.css';

type Props = {
  radio: Radio | undefined;
};

export const RadioDetail: React.FC<Props> = ({ radio }) => {
  if (!radio) return null;

  const isExistDesc = !radio.desc || radio.desc === '';
  const customInfo = radio.info.replace(
    /<a/g,
    '<a target="_blank" rel="noreferrer"'
  );

  return (
    <>
      <Box
        display={'flex'}
        justifyContent={'center'}
        alignItems={{ base: 'center', lg: 'flex-start' }}
        flexDirection={{ base: 'column', lg: 'row-reverse' }}
        maxW={'1100px'}
        mx={'auto'}
      >
        <Box>
          <Heading>{radio.title}</Heading>
          <Text mt={8} fontSize={'lg'}>
            出演者： {radio.pfm}
          </Text>
          {typeof radio.genre !== 'string' &&
            radio.genre.personality &&
            radio.genre.program && (
              <HStack mt={4}>
                <Tag colorScheme={'blue'} borderRadius="full">
                  {radio.genre.personality.name}
                </Tag>
                <Tag colorScheme={'blue'} borderRadius="full">
                  {radio.genre.program.name}
                </Tag>
              </HStack>
            )}
          <Image
            src={radio.station.logo}
            alt={radio.station.name}
            maxW={'140px'}
            mt={4}
          />
          <HStack mt={4} spacing={4}>
            <Button colorScheme={'orange'}>お気に入りに登録</Button>
            <Button colorScheme={'orange'}>レビューを投稿</Button>
          </HStack>
        </Box>
        <Box mt={{ base: 8, lg: 0 }} mr={{ lg: 10 }} flexShrink={0}>
          <Image src={radio.img} alt={radio.title} maxW={'480px'} w={'100%'} />
        </Box>
      </Box>
      <Divider mt={14} />
      <Flex justifyContent={'center'} mt={10}>
        <Box maxW={'800px'} fontSize={'lg'} overflow={'hidden'}>
          {isExistDesc || (
            <Box dangerouslySetInnerHTML={{ __html: radio.desc! }} />
          )}
          <Box
            dangerouslySetInnerHTML={{ __html: customInfo }}
            mt={isExistDesc ? 0 : 10}
            className={style.info}
          />
        </Box>
      </Flex>
    </>
  );
};
