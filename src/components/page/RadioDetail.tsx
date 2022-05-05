import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
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
import { useRouter } from 'next/router';
import { useUser } from '../../hooks/useUser';
import {
  fetchIsLikedRadio,
  likeRadio,
  unLikeRadio,
} from '../../firebase/db/like';
import { useMessage } from '../../hooks/useMessage';

type Props = {
  radio: Radio | undefined;
};

export const RadioDetail: React.FC<Props> = ({ radio }) => {
  const router = useRouter();
  const { user } = useUser();
  const { openMessage } = useMessage();

  const [isLiked, changeIsLiked] = useState(false);
  const isExistDesc = radio && (!radio.desc || radio.desc === '');
  const customInfo = radio
    ? radio.info.replace(/<a/g, '<a target="_blank" rel="noreferrer"')
    : '';

  const onClickLikeButton = () => {
    if (!radio) return;
    if (!user) return router.push('/login');

    if (isLiked) {
      unLikeRadio(user.uid, radio.radioId).then(() => {
        changeIsLiked(false);
        openMessage('お気に入りから削除しました', 'success');
      });
    } else {
      likeRadio(user.uid, radio.radioId).then(() => {
        changeIsLiked(true);
        openMessage('お気に入りに登録しました', 'success');
      });
    }
  };

  useEffect(() => {
    if (user && radio) {
      fetchIsLikedRadio(user.uid, radio.radioId).then(
        (isLikedRadio: boolean) => {
          changeIsLiked(isLikedRadio);
        }
      );
    }
  }, [user, radio]);

  if (!radio) return null;

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
            <Button colorScheme={'orange'} onClick={onClickLikeButton}>
              {isLiked ? 'お気に入りから削除' : 'お気に入りに登録'}
            </Button>
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
