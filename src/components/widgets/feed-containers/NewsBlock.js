import React, { useState, useEffect, useCallback } from 'react';
import Parser from 'rss-parser';
import './NewsBlock.css';

const NewsBlock = ({ feed, setSelectedChannel }) => {
  const [rssUrl] = useState(feed.url);
  const [feedData, setFeedData] = useState(null);
  const parser = new Parser();

  const fetchFeed = useCallback(async () => {
    try {
      const data = await parser.parseURL(rssUrl);
      setFeedData(data);
    } catch (error) {
      console.error('Error fetching RSS feed:', error);
    }
  }, [rssUrl]);

  useEffect(() => {
    fetchFeed();
  }, [rssUrl]);

  const onClicked = (feed) => {
    setSelectedChannel(feed);
  };

  return (
    <div className='feed-container'>
      {feedData && (
        <>
          {feed.style !== 'one-column' &&
            <h2 className='rss-title'>{feedData.title} - {feed.tags.join(', ')}</h2>
          }
          <ul className='rss-list'>
            {
              feedData.items.slice(0, feed.max).map((item, index) => (
                <li
                  key={index}
                  className={'rss-item ' + (feed.style || 'tow-column')}
                  onClick={onClicked.bind(this, feed)}
                >
                  <>
                    <h3 className='rss-item-title' title={item.title}>{item.title}</h3>
                    {item.enclosure && item.enclosure.url
                      ? (
                        <div className='enclosure'>
                          <img src={item.enclosure.url} alt={item.title} />
                          <div className='rss-item-content' dangerouslySetInnerHTML={{ __html: item.contentSnippet }} />
                        </div>
                      ) : <div className='rss-item-content' dangerouslySetInnerHTML={{ __html: item.content }} />
                    }
                    <div className='rss-item-meta'>
                      <span className='rss-item-meta-date'>{item.pubDate}</span>
                      <span className='rss-item-meta-author'>{item.author}</span>
                      <span className='rss-item-meta-rate'>{feed.rate}</span>
                    </div>
                  </>
                </li>)
              )
            }
          </ul>
        </>
      )}
    </div>
  );
};

export default NewsBlock;