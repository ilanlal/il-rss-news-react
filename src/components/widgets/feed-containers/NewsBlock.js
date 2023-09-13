import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

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
          <Container className='rss-list'>
            <Row>
              {
                feedData.items.slice(0, feed.max).map((item, index) => (
                  <Col sm={feed.style === 'one-column' ? 12 : 6}
                    key={index}
                    className={'rss-item ' + (feed.style || 'tow-column')}
                    onClick={onClicked.bind(this, feed)}
                  >
                    <h3 className='rss-item-title'>{item.title}</h3>
                    {item.enclosure &&
                      <>
                        <div className='rss-item-enclosure'>
                          {item.enclosure && item.enclosure.url &&
                            <img src={item.enclosure.url} alt={item.title} />
                          }
                        </div>
                        <div className='rss-item-content' dangerouslySetInnerHTML={{ __html: item.contentSnippet }} />
                      </>
                    }
                    {!item.enclosure &&
                      <>
                        <div className='rss-item-content' dangerouslySetInnerHTML={{ __html: item.content }} />
                      </>
                    }
                    <div className='rss-item-meta'>
                      <span className='rss-item-meta-date'>{item.pubDate}</span>
                      <span className='rss-item-meta-author'>{item.author}</span>
                      <span className='rss-item-meta-rate'>{feed.rate}</span>
                    </div>
                  </Col>)
                )
              }
            </Row>
          </Container>
        </>
      )}
    </div>
  );
};

export default NewsBlock;