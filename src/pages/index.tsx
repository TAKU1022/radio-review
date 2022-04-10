import type { NextPage } from 'next';
import { CommonLayout } from '../components/layout/CommonLayout';
import { TopPage } from '../components/page/TopPage';

const Top: NextPage = () => {
  return (
    <CommonLayout>
      <TopPage />
    </CommonLayout>
  );
};

export default Top;
