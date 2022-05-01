import React from 'react';
import { connectHits } from 'react-instantsearch-dom';
import { Hit, HitsProvided } from 'react-instantsearch-core';
import { Image, List, ListItem } from '@chakra-ui/react';
import { Radio } from '@/types/radikoProgram';

const Hits: React.FC<HitsProvided<Radio>> = ({ hits }) => {
  return (
    <List display={'grid'}>
      {hits.map((hit: Hit<Radio>) => (
        <ListItem key={hit.objectID}>
          <Image src={hit.img} alt={hit.title} />
        </ListItem>
      ))}
    </List>
  );
};

export const CustomHits = connectHits(Hits);
