import React from 'react';
import { Box, Center, Heading } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { InstantSearch } from 'react-instantsearch-dom';
import { SearchState } from 'react-instantsearch-core';
import { searchClient } from '../../algolia/client';
import { CustomHits } from '../UIkit/CustomHits';

export const RadioList: React.FC = () => {
  const router = useRouter();

  const updateQueryParams = (state: SearchState) => {
    router.push(
      {
        query: {
          id: router.query.id,
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
    <Box>
      <Center>
        <Heading>番組一覧</Heading>
      </Center>
      <InstantSearch
        searchClient={searchClient}
        onSearchStateChange={updateQueryParams}
        indexName={'radios'}
      >
        <CustomHits />
      </InstantSearch>
    </Box>
  );
};
