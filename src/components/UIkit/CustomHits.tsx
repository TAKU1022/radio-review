import React from 'react';
import NextLink from 'next/link';
import { connectHits } from 'react-instantsearch-dom';
import { Hit, HitsProvided } from 'react-instantsearch-core';
import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  IconButton,
  Image,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Tag,
  Text,
  Wrap,
  WrapItem,
} from '@chakra-ui/react';
import { Radio } from '@/types/radikoProgram';
import { useUser } from '../../hooks/useUser';
import { AiOutlineMore } from 'react-icons/ai';
import { deleteRadioById } from '../../firebase/db/radio';
import { useMessage } from '../../hooks/useMessage';

const Hits: React.FC<HitsProvided<Radio>> = ({ hits }) => {
  const { user } = useUser();
  const { openMessage } = useMessage();

  const deleteRadio = (radioId: string) => {
    deleteRadioById(radioId).then(() =>
      openMessage('番組を削除しました', 'success')
    );
  };

  return (
    <Grid
      as={'ul'}
      gridTemplateColumns={{
        md: 'repeat(2, 1fr)',
        lg: 'repeat(3, 1fr)',
      }}
      gridGap={4}
    >
      {hits.map((hit: Hit<Radio>) => (
        <GridItem
          key={hit.objectID}
          as={'li'}
          overflow={'hidden'}
          maxW={'480px'}
          mx={'auto'}
        >
          <NextLink href={`/radio/${hit.radioId}`} passHref>
            <Link>
              <Image src={hit.img} alt={hit.title} />
            </Link>
          </NextLink>
          <Box py={4} px={2}>
            <Flex justify={'space-between'} align={'center'}>
              <Text fontSize={'lg'} fontWeight={'bold'}>
                <NextLink href={`/radio/${hit.radioId}`} passHref>
                  <Link>{hit.title}</Link>
                </NextLink>
              </Text>
              {user && user.isAdmin && (
                <Box>
                  <Menu>
                    <MenuButton
                      as={IconButton}
                      icon={<AiOutlineMore />}
                      size={'sm'}
                      variant={'outline'}
                      colorScheme={'blue'}
                    />
                    <MenuList>
                      <MenuItem>編集する</MenuItem>
                      <MenuItem onClick={() => deleteRadio(hit.radioId)}>
                        削除する
                      </MenuItem>
                    </MenuList>
                  </Menu>
                </Box>
              )}
            </Flex>
            <Wrap mt={3}>
              <WrapItem>
                <Tag
                  colorScheme={'blue'}
                  variant={'outline'}
                  borderRadius="full"
                >
                  {hit.station.name}
                </Tag>
              </WrapItem>
              {typeof hit.genre !== 'string' &&
                hit.genre.personality &&
                hit.genre.program && (
                  <>
                    <WrapItem>
                      <Tag
                        colorScheme={'blue'}
                        variant={'outline'}
                        borderRadius="full"
                      >
                        {hit.genre.program.name}
                      </Tag>
                    </WrapItem>
                    <WrapItem>
                      <Tag
                        colorScheme={'blue'}
                        variant={'outline'}
                        borderRadius="full"
                      >
                        {hit.genre.personality.name}
                      </Tag>
                    </WrapItem>
                  </>
                )}
            </Wrap>
          </Box>
        </GridItem>
      ))}
    </Grid>
  );
};

export const CustomHits = connectHits(Hits);
