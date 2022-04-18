import { NextPage } from 'next';
import { CommonLayout } from '../../components/layout/CommonLayout';
import { Login } from '../../components/page/Login';

const LoginPage: NextPage = () => {
  return (
    <CommonLayout>
      <Login />
    </CommonLayout>
  );
};

export default LoginPage;
