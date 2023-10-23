import React, { useState, useMemo } from "react";
import Parser from 'rss-parser';
import Stack from '@mui/material/Stack';
import StackItem from '@mui/material/Stack';
import CompactPaper from "../papers/CompactPaper";

function CompactPanel({ feedInfo, onClick }) {
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
    <Stack display={"block"} spacing={1} sx={{ p: 1, textAlign: 'center' }}>
      {posts && posts.map((post, index) => (
        <StackItem display={"inline-block"} key={'compact_' + index}>
          {state.feed.layout &&
            <CompactPaper feed={state.feed} post={post} onClick={onClick} />
          }
        </StackItem>
      ))
      }
    </Stack>
  )
}


export default CompactPanel;