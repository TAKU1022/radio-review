import React, { useState } from 'react';
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
  useDisclosure,
} from '@chakra-ui/react';
import { Radio } from '@/types/radikoProgram';
import { ReviewCommentWithUser } from '@/types/reviewComment';
import style from '../../styles/RadioDetail.module.css';
import { useRouter } from 'next/router';
import { useUser } from '../../hooks/useUser';
import { likeRadio, unLikeRadio } from '../../firebase/db/like';
import { useMessage } from '../../hooks/useMessage';
import { ReviewModal } from '../UIkit/ReviewModal';
import { CommentList } from '../UIkit/CommentList';

type Props = {
  radio: Radio | undefined;
  boolLiked: boolean;
  reviewCommentWithUserList: ReviewCommentWithUser[] | undefined;
};

export const RadioDetail: React.FC<Props> = ({
  radio,
  boolLiked,
  reviewCommentWithUserList,
}) => {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user } = useUser();
  const { openMessage } = useMessage();

  const [isLiked, changeIsLiked] = useState(boolLiked);
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

  const onClickReviewButton = () => {
    if (!radio) return;
    if (!user) return router.push('/login');

    onOpen();
  };

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
          <Heading as={'h1'}>{radio.title}</Heading>
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
              {user && isLiked ? 'お気に入りから削除' : 'お気に入りに登録'}
            </Button>
            <Button colorScheme={'orange'} onClick={onClickReviewButton}>
              レビューを投稿
            </Button>
            <ReviewModal isOpen={isOpen} onClose={onClose} radio={radio} />
          </HStack>
        </Box>
        <Box mt={{ base: 8, lg: 0 }} mr={{ lg: 10 }} flexShrink={0}>
          <Image src={radio.img} alt={radio.title} maxW={'480px'} w={'100%'} />
        </Box>
      </Box>
      <Flex justifyContent={'center'} mt={16}>
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

      <Divider mt={16} />

      <Box maxW={'800px'} mx={'auto'} mt={16}>
        <Heading fontSize={'2xl'}>
          「{radio.title}」に投稿されたレビュー
        </Heading>
        <Box mt={8}>
          <CommentList reviewCommentWithUserList={reviewCommentWithUserList} />
        </Box>
      </Box>
    </>
  );
};
