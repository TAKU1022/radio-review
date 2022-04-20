import { NextPage } from 'next';
import { CommonLayout } from '../../components/layout/CommonLayout';
import { Admin } from '../../components/page/Admin';

const AdminPage: NextPage = () => {
  return (
    <CommonLayout>
      <Admin />
    </CommonLayout>
  );
};

export default AdminPage;
