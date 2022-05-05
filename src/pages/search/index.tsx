import { NextPage } from 'next';
import { CommonLayout } from '../../components/layout/CommonLayout';
import { Search } from '../../components/page/Search';

const SearchPage: NextPage = () => {
  return (
    <CommonLayout>
      <Search />
    </CommonLayout>
  );
};

export default SearchPage;
