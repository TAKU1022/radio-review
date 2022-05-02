import { NextPage } from 'next';
import { CommonLayout } from '../../components/layout/CommonLayout';
import { RadioDetail } from '../../components/page/RadioDetail';

const RadioDetailPage: NextPage = () => {
  return (
    <CommonLayout>
      <RadioDetail />
    </CommonLayout>
  );
};

export default RadioDetailPage;
