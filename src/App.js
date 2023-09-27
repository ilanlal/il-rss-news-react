import React, { useState } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Divider from '@mui/material/Divider';
import { styled } from '@mui/material/styles';
import WidePanel from './components/panels/WidePanel';
import CompactPanel from './components/panels/CompactPanel';
import ComplexPanel from './components/panels/ComplexPanel';
import RowTickers from './components/panels/RowTickers';

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'קוד פתוח ברישיון MIT ©'}
      <Link color="inherit" href="https://linkedin.com/in/ilanlal">
        אילן ללום
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default function App({ configData }) {
  const [state] = useState({
    feeds: configData.Feeds.map((feed) => {
      return {
        ...feed,
        posts: [],
      };
    }),
    config: configData,
    appName: configData.appName,
  });

  const onClick = (data) => {
    console.log('App -> onClick:', data);
  }
  const Offset = styled('div')(({ theme }) => theme.mixins.toolbar);

  return (
    <React.Fragment>
      <AppBar position="fixed">
        <Toolbar sx={{ my: 0, display: 'flex', direction: 'rtl' }} >
          <Box sx={{ my: 0, display: 'flex', direction: 'rtl' }}>
            <Typography variant="h4">
              {<span role='img' aria-label={state.appName}>📰</span>}
            </Typography>
            <Divider />
            <Typography variant="h6">
              {state.appName}
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>
      <Offset />
      <Container maxWidth="md" sx={{ my: 1, direction: 'rtl' }}>
        <Box sx={{ textAlign: 'right' }}>
          {state.feeds && (state.feeds.map((feed, index) => (
            <div key={'d_' + index}>
              {feed.layout === 'wide-pager' &&
                <WidePanel feedInfo={feed} onClick={onClick} />}
              {feed.layout === 'compact-pager' &&
                <CompactPanel feedInfo={feed} onClick={onClick} />}
              {feed.layout === 'complex-pager' &&
                <ComplexPanel feedInfo={feed} onClick={onClick} />}
              {feed.layout === 'row-tickers' &&
                <RowTickers feedInfo={feed} onClick={onClick} />}
            </div>
          )))}
          <Copyright />
        </Box>
      </Container>
    </React.Fragment>


    //  <div className="App">
    //    <header className="App-header">
    //      <h1><a href='/'><span role='img' aria-label={state.appName}>📰</span>{state.appName}</a></h1>
    //      {false && state.topTickers.map((tickerFeed) => (
    //        // TOP Breaking news Ticker
    //        <BreakingNewsTicker feedMeta={tickerFeed} />
    //      ))}
    //    </header>

    //    <main className='App-body'>
    //      {state.feeds &&
    //        (state.feeds.map((feed) => (
    //          <RssPanel feedInfo={feed} onClick={onClick} />
    //        )))}
    //    </main>

    //    <footer className='App-footer'>
    //      {state.bottomTickers && state.bottomTickers.map((tickerFeed) => (
    //       // BOTTOM Breaking news Ticker
    //        <BreakingNewsTicker feedMeta={tickerFeed} />
    //      ))}
    //    </footer>
    //  </div>
  );
}