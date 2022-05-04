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

type Props = {
  radio: Radio | undefined;
};

const RadioDetailPage: NextPage<Props> = ({ radio }) => {
  return (
    <CommonLayout>
      <RadioDetail radio={radio} />
    </CommonLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>
) => {
  const radioId = context.params ? (context.params.slug as string) : '';
  const radio = await fetchRadioById(radioId);
  return { props: { radio } };
};

export default RadioDetailPage;
