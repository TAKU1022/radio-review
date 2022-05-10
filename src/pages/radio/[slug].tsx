import { Radio } from '@/types/radikoProgram';
import {
  GetServerSideProps,
  GetServerSidePropsContext,
  NextPage,
  PreviewData,
} from 'next';
import { ParsedUrlQuery } from 'querystring';
import { CommonLayout } from '../../components/layout/CommonLayout';
import { RadioDetail } from '../../components/page/RadioDetail';
import { fetchRadioById } from '../../firebase/db/radio';
import { fetchIsLikedRadio } from '../../firebase/db/like';
import nookies from 'nookies';
import { fetchReviewCommentsWithUser } from '../../firebase/db/comment';
import { ReviewCommentWithUser } from '@/types/reviewComment';

type Props = {
  radio: Radio | undefined;
  boolLiked: boolean;
  reviewCommentWithUserList: ReviewCommentWithUser[] | undefined;
};

const RadioDetailPage: NextPage<Props> = ({
  radio,
  boolLiked,
  reviewCommentWithUserList,
}) => {
  return (
    <CommonLayout>
      <RadioDetail
        radio={radio}
        boolLiked={boolLiked}
        reviewCommentWithUserList={reviewCommentWithUserList}
      />
    </CommonLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>
) => {
  const radioId = context.params ? (context.params.slug as string) : '';
  const cookies = nookies.get(context);
  const userId: string = cookies.uid;

  const radio = await fetchRadioById(radioId);
  const boolLiked = await fetchIsLikedRadio(userId, radioId);
  const reviewCommentWithUserList = await fetchReviewCommentsWithUser(radioId);

  return { props: { radio, boolLiked, reviewCommentWithUserList } };
};

export default RadioDetailPage;
