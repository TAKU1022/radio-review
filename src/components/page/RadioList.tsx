import React from 'react';
import { Box, Center, Heading } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { InstantSearch } from 'react-instantsearch-dom';
import { Configure, SearchState } from 'react-instantsearch-core';
import { searchClient } from '../../algolia/client';
import { CustomHits } from '../UIkit/CustomHits';
import { CustomPagination } from '../UIkit/CustomPagination';

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
    <>
      <Center>
        <Heading>番組一覧</Heading>
      </Center>
      <Box mt={10}>
        <InstantSearch
          searchClient={searchClient}
          onSearchStateChange={updateQueryParams}
          indexName={'radios'}
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
    </>
  );
};
