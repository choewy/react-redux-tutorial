import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import ReduxProvider from './redux';

ReactDOM.render(
  <ReduxProvider>
    <App />
  </ReduxProvider>,
  document.getElementById('root')
);
