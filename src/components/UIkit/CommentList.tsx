import React from 'react';
import { List, ListItem, Text } from '@chakra-ui/react';
import { ReviewCommentWithUser } from '@/types/reviewComment';

type Props = {
  reviewCommentWithUserList: ReviewCommentWithUser[] | undefined;
};

export const CommentList: React.FC<Props> = ({ reviewCommentWithUserList }) => {
  return (
    <>
      {reviewCommentWithUserList ? (
        <List>
          {reviewCommentWithUserList.map(
            (reviewCommentWithUser: ReviewCommentWithUser) => (
              <ListItem key={reviewCommentWithUser.reviewComment.commentId}>
                {reviewCommentWithUser.reviewComment.commentId}
              </ListItem>
            )
          )}
        </List>
      ) : (
        <Text>nothing</Text>
      )}
    </>
  );
};
