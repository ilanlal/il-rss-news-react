import React, { useState, useMemo } from "react";
import Parser from 'rss-parser';
import Stack from '@mui/material/Stack';
import StackItem from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';

function RowTickers({ feedInfo, onClick }) {
  const [state] = useState({
    feed: feedInfo
  });

  const [posts, setPosts] = useState([]); // [state.posts

  const parser = new Parser();

  useMemo(async () => {
    return await parser.parseURL(state.feed.url)
      .then((response) => {
        console.log('fetchFeed -> response:', response);
        const items = response.items.slice(0, state.feed.max);
        setPosts(items);
        return items;
      })
      .catch((error) => {
        console.error('Error fetching RSS feed: CHECK YOUR INTERNET CONNECTION', error);
      });
  }, [state.feed.url, state.feed.max]);

  return (
    <Stack spacing={{ xs: 1 }} direction="row" useFlexGap flexWrap="wrap"
      divider={<Divider orientation="vertical" flexItem />}>
      {posts && posts.map((post, index) => (
        <StackItem key={'compact_' + index}>
          {state.feed.layout &&
            <Chip label={post.title} variant="outlined" onClick={onClick.bind(this, post)} 
              sx={{ m: 0.5 }}
            />
          }
        </StackItem>
      ))
      }
    </Stack>
  )
}


export default RowTickers;