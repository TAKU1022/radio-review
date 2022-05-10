import React from 'react';
import {
  Avatar,
  Box,
  HStack,
  List,
  ListItem,
  Text,
  VStack,
} from '@chakra-ui/react';
import { ReviewCommentWithUser } from '@/types/reviewComment';

type Props = {
  reviewCommentWithUserList: ReviewCommentWithUser[] | undefined;
};

export const CommentList: React.FC<Props> = ({ reviewCommentWithUserList }) => {
  return (
    <>
      {reviewCommentWithUserList ? (
        <VStack as={'ul'} align={'stretch'} spacing={6}>
          {reviewCommentWithUserList.map(
            (reviewCommentWithUser: ReviewCommentWithUser) => (
              <Box
                key={reviewCommentWithUser.reviewComment.commentId}
                as={'li'}
                listStyleType={'none'}
                border={'1px'}
                borderColor={'gray.200'}
                borderRadius={'md'}
                p={4}
              >
                <HStack spacing={4}>
                  <Avatar
                    name={reviewCommentWithUser.user?.name}
                    src={reviewCommentWithUser.user?.avatarURL}
                  />
                  <Box>
                    <Text fontSize={'lg'} fontWeight={'bold'}>
                      {reviewCommentWithUser.user?.name}
                    </Text>
                    <Text fontSize={'sm'}>
                      {reviewCommentWithUser.reviewComment.createdAt.toLocaleDateString()}
                    </Text>
                  </Box>
                </HStack>
                <Text whiteSpace={'pre-wrap'} mt={6}>
                  {reviewCommentWithUser.reviewComment.text}
                </Text>
              </Box>
            )
          )}
        </VStack>
      ) : (
        <Text display={'flex'} justifyContent={'center'}>
          この番組にはまだレビューが投稿されていません。
        </Text>
      )}
    </>
  );
};
