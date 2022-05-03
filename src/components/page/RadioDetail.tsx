import React from 'react';
import {
  Box,
  Center,
  Divider,
  Flex,
  Heading,
  Image,
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
    <Box maxW={'800px'} mx={'auto'}>
      <Box display={'flex'} alignItems={'flex-start'}>
        <Box mr={10}>
          <Image src={radio.img} alt={radio.title} maxW={'480px'} />
        </Box>
        <Heading>{radio.title}</Heading>
      </Box>
      <Divider mt={10} />
      <Box mt={10} fontSize={'lg'}>
        {isExistDesc || (
          <Box dangerouslySetInnerHTML={{ __html: radio.desc! }} />
        )}
        <Box
          dangerouslySetInnerHTML={{ __html: customInfo }}
          mt={10}
          className={style.info}
        />
      </Box>
    </Box>
  );
};
