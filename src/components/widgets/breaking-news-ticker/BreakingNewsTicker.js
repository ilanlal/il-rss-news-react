import React, { useState, useEffect, useCallback } from 'react';
import Parser from 'rss-parser';
import './BreakingNewsTicker.css';

const BreakingNewsTicker = ({ feed }) => {
  const parser = new Parser();
  const [rssUrl] = useState(feed.url);
  const [news, setNews] = useState([]);
  const [currentNewsIndex, setCurrentNewsIndex] = useState(0);
  const [rollBack, setRollBack] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentNewsIndex((prevIndex) => {
        if (prevIndex === news.length - 1) {
          //need to blur the roll back
          setRollBack(true);
          return 0;
        }
        else{
          return prevIndex + 1;
        }
      }
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [news.length]);

  useEffect(() => {
    fetchNews().then((items) => {
      setNews(items);
    });

  }, [rssUrl]);

  const fetchNews = useCallback(async () => {
    const data = await parser.parseURL(rssUrl);
    console.log('fetchNews:', rssUrl, data.items);
    return data.items.slice(0, feed.max);
  }, [rssUrl]);

  return (
    <div className="breaking-news-ticker">
      <div
        className="ticker-container"
        style={{
          transform: {rollBack} ? `translateX(${currentNewsIndex * feed.speed}%)` : `transform 1s liner 0`,
        }}
      >
        {news && (news.map((item, index) => (
          <div
            key={index}
            className={`ticker-item`}
          >{item.title}</div>
        ))
        )}
      </div>
    </div>
  );
};

export default BreakingNewsTicker;