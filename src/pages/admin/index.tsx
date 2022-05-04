import { NextPage } from 'next';
import { AdminGuard } from '../../components/functional/AdminGuard';
import { CommonLayout } from '../../components/layout/CommonLayout';
import { Admin } from '../../components/page/Admin';

const AdminPage: NextPage = () => {
  return (
    <AdminGuard>
      <CommonLayout>
        <Admin />
      </CommonLayout>
    </AdminGuard>
  );
};

export default AdminPage;
