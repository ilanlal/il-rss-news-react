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
      .then((response) => {
        console.log('fetchFeed -> response:', response);
        const items = response.items.slice(0, state.feed.max);
        setPosts(items);
        return items;
      })
      .catch((error) => {
        console.error('CHECK YOUR INTERNET CONNECTION', error);
      });
  }, [state.feed.url, state.feed.max]);

  return (
    <Stack display={"inline-block"} spacing={1} sx={{ p: 0, textAlign: 'justify' }}>
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