import type { GetServerSideProps, NextPage } from 'next';
import { CommonLayout } from '../../components/layout/CommonLayout';
import { RadioList } from '../../components/page/RadioList';

type Props = {
  data: string;
};

const RadioListPage: NextPage<Props> = ({ data }) => {
  console.log(data);
  return (
    <CommonLayout>
      <RadioList />
    </CommonLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  return { props: { data: 'demo' } };
};

export default RadioListPage;
