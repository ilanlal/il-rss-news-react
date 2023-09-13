import React, { useState, useEffect } from 'react';
import Parser from 'rss-parser';
import './Channel.css';

const Channel = ({ rssChannel, setSelectedChannel }) => {
    const [rssUrl] = useState(rssChannel.url);
    const [news, setNews] = useState([]);
    const parser = new Parser();
    const fetchFeed = async () => {
        try {
            const data = await parser.parseURL(rssUrl);
            setNews(data.items);
        } catch (error) {
            console.error('Error fetching RSS feed:', error);
        }
    };

    const onClose = (e) => {
        setSelectedChannel(null);
    }

    useEffect(() => {
        fetchFeed();
    }, [rssUrl]);

    return (
        <div className='channel'>
            <button onClick={onClose} title='חזרה'><span role="img" aria-label="סגירה">❌</span></button>
            {news && (
                <div>
                    <ul className='rss-list'>
                        {
                            news.map((item, index) => (
                                <li className={'rss-item'} key={index}>
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
                                        <span className='rss-item-meta-rate'>{rssChannel.rate}</span>
                                    </div>
                                </li>)
                            )
                        }
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Channel;