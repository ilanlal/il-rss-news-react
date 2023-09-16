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
            <button className='channel-button' onClick={onClose} title='חזרה לדף הבית'><span role="img" aria-label="עמוד הבית">🏠 בית</span></button>
            {news && (
                <div>
                    <ul className='channel-list'>
                        {
                            news.map((item, index) => (
                                <li className={'channel-item'} key={index}>
                                    <h3 className='channel-item-title'>{item.title}</h3>
                                    {item.enclosure && item.enclosure.url
                                        ? 
                                        (<>
                                            <div className='channel-enclosure'>{item.enclosure && item.enclosure.url && <img src={item.enclosure.url} alt={item.title} />}</div>
                                            <div className='channel-item-content' dangerouslySetInnerHTML={{ __html: item.contentSnippet }} />
                                        </>)
                                        : <div className='channel-item-content' dangerouslySetInnerHTML={{ __html: item.content }} />
                                    }
                                    <div className='channel-item-meta'>
                                        <span className='channel-item-meta-date'>{item.pubDate}</span>
                                        <span className='channel-item-meta-author'>{item.author}</span>
                                        <span className='channel-item-meta-rate'>{rssChannel.rate}</span>
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