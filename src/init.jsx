import ReactDOM from 'react-dom';
import React from 'react';

import App from './components/App';

export default (initialData) => {
  ReactDOM.render(
    <App initialData={initialData} />,
    document.getElementById('chat'),
  );
};
