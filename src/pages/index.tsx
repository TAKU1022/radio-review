import type { NextPage } from 'next';
import { CommonLayout } from '../components/layout/CommonLayout';
import { Top } from '../components/page/Top';

const TopPage: NextPage = () => {
  return (
    <CommonLayout>
      <Top />
    </CommonLayout>
  );
};

export default TopPage;
