import React, { useState } from 'react';
import BreakingNewsTicker from './widgets/breaking-news-ticker/BreakingNewsTicker';
import NewsBlock from './widgets/feed-containers/NewsBlock';
import Channel from './channels/Channel';
import './Home.css';

const Home = ({ configData }) => {
    const [state] = useState({
        topBreakingNewsTicker: configData.BreakingNewsTicker.filter(f => f.style === 'top'),
        bottomBreakingNewsTicker: configData.BreakingNewsTicker.filter(f => f.style === 'bottom'),
        rssNewsContent: configData.Feeads,
        config: configData,
    });

    const [selectedChannel, setSelectedChannel] = useState(null);

    return (
        <>
            <div className="App-header">
                <h1>{state.config.appName}</h1>
                {state.topBreakingNewsTicker.map((rssFeed) => (
                    <BreakingNewsTicker feed={rssFeed} />
                ))}
            </div>
            {selectedChannel &&
                <Channel rssChannel={selectedChannel} setSelectedChannel={setSelectedChannel}/>
            }
            {!selectedChannel &&
                <>
                    <div className='rss-panel'>
                        {state.rssNewsContent.map((rssFeed) => (
                            <NewsBlock feed={rssFeed} setSelectedChannel={setSelectedChannel} />
                        ))}
                    </div>
                    <div className='App-footer'>
                        {state.bottomBreakingNewsTicker.map((rssFeed) => (
                            <BreakingNewsTicker feed={rssFeed} />
                        ))}
                    </div>
                </>
            }
        </>);
};

export default Home;