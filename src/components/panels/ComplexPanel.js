import React, { useState, useMemo } from "react";
import Parser from 'rss-parser';
import Stack from '@mui/material/Stack';
import StackItem from '@mui/material/Stack';
import WidePaper from '../papers/WidePaper';
import ComfortPaper from "../papers/ComfortPaper";

function ComplexPanel({ feedInfo, onClick }) {
  const [state] = useState({
    feed: feedInfo
  });

  const [posts, setPosts] = useState([]); // [state.posts

  const parser = new Parser();

  useMemo(async () => {
    return await parser.parseURL(state.feed.url)
      .catch((error) => {
        console.error('Error fetching RSS feed:', error);
      })
      .then((response) => {
        console.log('fetchFeed -> response:', response);
        const items = response.items.slice(0, state.feed.max);
        setPosts(items);
        return items;
      });
  }, [state.feed.url, state.feed.max]);

  return (
    <Stack display={"block"} spacing={0} sx={{ p: 1, textAlign: 'justify' }}>
      <>
        {posts && posts.slice(0, 1).map((post, index) => (
          <StackItem display={"inline-block"} key={'complex_' + index}>
            <WidePaper feed={state.feed} post={post} onClick={onClick} />
          </StackItem>
        ))
        }
        {posts && posts.slice(1, posts.length).map((post, index) => (
          <StackItem display={"inline-block"} key={'complex_' + index}>
            <ComfortPaper feed={state.feed} post={post} onClick={onClick} />
          </StackItem>
        ))
        }
      </>
    </Stack>
  )
}


export default ComplexPanel;