import React from 'react';
import {
  Button,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  VisuallyHidden,
} from '@chakra-ui/react';
import { Search2Icon } from '@chakra-ui/icons';
import { useForm } from 'react-hook-form';
import { SearchBoxProvided } from 'react-instantsearch-core';
import { connectSearchBox } from 'react-instantsearch-dom';

type FormData = {
  keyword: string;
};

const SearchBoxBase: React.FC<SearchBoxProvided> = ({
  currentRefinement,
  refine,
}) => {
  const { register, handleSubmit } = useForm<FormData>();

  const search = (formData: FormData) => {
    if (formData.keyword === '') return;

    refine(formData.keyword);
  };

  return (
    <form noValidate onSubmit={handleSubmit(search)} role="search">
      <VisuallyHidden>
        <label htmlFor="search">番組を検索する</label>
      </VisuallyHidden>
      <HStack spacing={4}>
        <InputGroup>
          <InputLeftElement pointerEvents={'none'}>
            <Search2Icon />
          </InputLeftElement>
          <Input
            {...register('keyword')}
            id="search"
            type={'search'}
            focusBorderColor={'orange.400'}
            placeholder={'キーワード検索'}
            autoComplete={'off'}
          />
        </InputGroup>
        <Button type={'submit'} colorScheme={'orange'}>
          検索
        </Button>
      </HStack>
    </form>
  );
};

export const CustomSearchBox = connectSearchBox(SearchBoxBase);
