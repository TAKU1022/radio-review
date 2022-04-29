import type { GetServerSideProps, NextPage } from 'next';
import { CommonLayout } from '../../components/layout/CommonLayout';
import { RadioList } from '../../components/page/RadioList';

const RadioListPage: NextPage = () => {
  return (
    <CommonLayout>
      <RadioList />
    </CommonLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  return { props: {} };
};

export default RadioListPage;
