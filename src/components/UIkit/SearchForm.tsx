import React from 'react';
import {
  Button,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
} from '@chakra-ui/react';
import { Search2Icon } from '@chakra-ui/icons';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';

type FormData = {
  keyword: string;
};

export const SearchForm: React.FC = () => {
  const router = useRouter();
  const { register, handleSubmit } = useForm<FormData>();

  const onSubmit = (formData: FormData) => {
    if (formData.keyword === '') return;

    router.push({
      pathname: 'search',
      query: { q: decodeURIComponent(formData.keyword) },
    });
  };

  return (
    <form noValidate role="search" onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="search" className="srOnly">
        番組を検索する
      </label>
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
