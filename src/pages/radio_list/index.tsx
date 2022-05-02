import type { NextPage } from 'next';
import { CommonLayout } from '../../components/layout/CommonLayout';
import { RadioList } from '../../components/page/RadioList';

const RadioListPage: NextPage = () => {
  return (
    <CommonLayout>
      <RadioList />
    </CommonLayout>
  );
};

export default RadioListPage;
