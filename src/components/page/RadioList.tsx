import React from 'react';
import { Box, Center, Heading } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { InstantSearch, Configure } from 'react-instantsearch-dom';
import { SearchState } from 'react-instantsearch-core';
import { searchClient } from '../../algolia/client';
import { CustomHits } from '../UIkit/CustomHits';
import { CustomPagination } from '../UIkit/CustomPagination';
import { SearchForm } from '../UIkit/SearchForm';

export const RadioList: React.FC = () => {
  const router = useRouter();

  const updateQueryParams = (state: SearchState) => {
    router.push(
      {
        query: {
          page: state.page || [],
        },
      },
      undefined,
      {
        shallow: true,
      }
    );
  };

  return (
    <>
      <Center>
        <Heading>番組一覧</Heading>
      </Center>
      <Box mt={10}>
        <Box maxW={'460px'} mx={'auto'}>
          <SearchForm />
        </Box>
        <Box mt={10}>
          <InstantSearch
            searchClient={searchClient}
            searchState={{ page: router.query.page || 1 }}
            onSearchStateChange={updateQueryParams}
            indexName={'radios'}
            refresh={true}
          >
            <Configure hitsPerPage={12} />
            <CustomHits />
            <Box mt={10}>
              <CustomPagination
                defaultRefinement={(router.query.page as string) || 1}
              />
            </Box>
          </InstantSearch>
        </Box>
      </Box>
    </>
  );
};
