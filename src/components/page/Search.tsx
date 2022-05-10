import React from 'react';
import { useRouter } from 'next/router';
import { Box, Heading } from '@chakra-ui/react';
import { InstantSearch, Configure } from 'react-instantsearch-dom';
import { SearchState } from 'react-instantsearch-core';
import { searchClient } from '../../algolia/client';
import { CustomHits } from '../UIkit/CustomHits';
import { CustomPagination } from '../UIkit/CustomPagination';
import { CustomSearchBox } from '../UIkit/CustomSearchBox';

export const Search: React.FC = () => {
  const router = useRouter();

  const updateQueryParams = (state: SearchState) => {
    router.push({
      query: {
        q: state.query,
        page: !state.page || state.page === 1 ? [] : state.page,
      },
    });
  };

  return (
    <>
      <Heading as={'h1'} display={'flex'} justifyContent={'center'}>
        {router.query.q}に関する番組
      </Heading>
      <Box mt={10}>
        <InstantSearch
          searchClient={searchClient}
          searchState={{ page: router.query.page || 1 }}
          onSearchStateChange={updateQueryParams}
          indexName={'radios'}
          refresh={true}
        >
          <Configure hitsPerPage={12} />
          <Box maxW={'460px'} mx={'auto'}>
            <CustomSearchBox defaultRefinement={router.query.q as string} />
          </Box>
          <Box mt={10}>
            <CustomHits />
          </Box>
          <Box mt={10}>
            <CustomPagination
              defaultRefinement={(router.query.page as string) || 1}
            />
          </Box>
        </InstantSearch>
      </Box>
    </>
  );
};
