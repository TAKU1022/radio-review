import { Radio } from '@/types/radikoProgram';
import {
  GetStaticPaths,
  GetStaticProps,
  GetStaticPropsContext,
  NextPage,
  PreviewData,
} from 'next';
import { ParsedUrlQuery } from 'querystring';
import { CommonLayout } from '../../components/layout/CommonLayout';
import { RadioDetail } from '../../components/page/RadioDetail';
import { fetchAllRadio, fetchRadioById } from '../../firebase/db/radio';

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

export const getStaticPaths: GetStaticPaths = async () => {
  const allRadio = await fetchAllRadio();
  const paths = allRadio.map((radio: Radio) => ({
    params: { slug: radio.radioId },
  }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async (
  context: GetStaticPropsContext<ParsedUrlQuery, PreviewData>
) => {
  const radioId = context.params ? (context.params.slug as string) : '';
  const radio = await fetchRadioById(radioId);

  return { props: { radio } };
};

export default RadioDetailPage;
