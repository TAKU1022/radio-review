import { NextPage } from 'next';
import { GuestGuard } from '../../components/functional/GuestGuard';
import { CommonLayout } from '../../components/layout/CommonLayout';
import { Login } from '../../components/page/Login';

const LoginPage: NextPage = () => {
  return (
    <GuestGuard>
      <CommonLayout>
        <Login />
      </CommonLayout>
    </GuestGuard>
  );
};

export default LoginPage;
