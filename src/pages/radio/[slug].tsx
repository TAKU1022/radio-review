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

type Props = {
  radio: Radio | undefined;
  boolLiked: boolean;
};

const RadioDetailPage: NextPage<Props> = ({ radio, boolLiked }) => {
  return (
    <CommonLayout>
      <RadioDetail radio={radio} boolLiked={boolLiked} />
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

  return { props: { radio, boolLiked } };
};

export default RadioDetailPage;
