import React from 'react';
import './App.css';
import Home from './components/Home';

function App({ configData }) {
  return (
    <div className="App">
      <Home configData={configData} />
    </div>

  );
}

export default App;
