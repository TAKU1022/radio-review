import React from 'react';
import { connectPagination } from 'react-instantsearch-dom';
import { Button, HStack, IconButton } from '@chakra-ui/react';
import {
  FiChevronLeft,
  FiChevronRight,
  FiChevronsLeft,
  FiChevronsRight,
} from 'react-icons/fi';

type Props = {
  currentRefinement: number;
  nbPages: number;
  refine: (value: number) => void;
};

const Pagination: React.FC<Props> = ({
  currentRefinement,
  nbPages,
  refine,
}) => {
  const prevPage = currentRefinement > 1 ? currentRefinement - 1 : null;
  const nextPage = currentRefinement < nbPages ? currentRefinement + 1 : null;
  const startPage =
    nbPages <= 5 || currentRefinement <= 3
      ? // トリミングが発生しない or トリミングしているがページ序盤にいる場合
        1
      : currentRefinement + 2 > nbPages
      ? // トリミングしているがページ終端にいる場合
        nbPages - 4
      : // トリミング時
        currentRefinement - 2;
  const endPage =
    nbPages <= 5 || currentRefinement + 2 > nbPages
      ? // トリミングが発生しない or トリミングしているがページ終端にいる場合
        nbPages
      : currentRefinement <= 3
      ? // トリミングしているがページ序盤にいる場合
        5
      : // トリミング時
        currentRefinement + 2;
  // ページの配列を作成 (ex.[3,4,5,6,7]
  const pageList = [...Array(endPage - startPage + 1).keys()].map(
    (e) => e + startPage
  );

  return (
    <HStack justify={'center'}>
      {prevPage && (
        <>
          <IconButton
            colorScheme={'blue'}
            variant={'outline'}
            icon={<FiChevronsLeft />}
            aria-label={'最初のページへ戻る'}
            size={'sm'}
            onClick={() => refine(1)}
          />
          <IconButton
            colorScheme={'blue'}
            variant={'outline'}
            icon={<FiChevronLeft />}
            aria-label={'前のページへ戻る'}
            size={'sm'}
            onClick={() => refine(prevPage)}
          />
        </>
      )}
      {pageList.map((page: number) => (
        <Button
          key={page}
          colorScheme={'blue'}
          variant={currentRefinement === page ? undefined : 'outline'}
          aria-label={`${page}ページへ移動する`}
          size={'sm'}
          disabled={currentRefinement === page}
          _disabled={{ cursor: 'initial' }}
          onClick={() => currentRefinement !== page && refine(page)}
        >
          {page}
        </Button>
      ))}
      {nextPage && (
        <>
          <IconButton
            colorScheme={'blue'}
            variant={'outline'}
            icon={<FiChevronRight />}
            aria-label="次のページへ進む"
            size={'sm'}
            onClick={() => refine(nextPage)}
          />
          <IconButton
            colorScheme={'blue'}
            variant={'outline'}
            icon={<FiChevronsRight />}
            aria-label="最後のページへ進む"
            size={'sm'}
            onClick={() => refine(nbPages)}
          />
        </>
      )}
    </HStack>
  );
};

export const CustomPagination = connectPagination(Pagination);
