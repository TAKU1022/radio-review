import React from 'react';
import NextLink from 'next/link';
import { connectHits } from 'react-instantsearch-dom';
import { Hit, HitsProvided } from 'react-instantsearch-core';
import {
  Box,
  Grid,
  GridItem,
  Image,
  Link,
  Tag,
  Text,
  Wrap,
  WrapItem,
} from '@chakra-ui/react';
import { Radio } from '@/types/radikoProgram';

const Hits: React.FC<HitsProvided<Radio>> = ({ hits }) => {
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
            <NextLink href={`/radio/${hit.radioId}`} passHref>
              <Link>
                <Text fontSize={'lg'} fontWeight={'bold'}>
                  {hit.title}
                </Text>
              </Link>
            </NextLink>
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
