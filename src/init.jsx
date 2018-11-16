import '@babel/polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import reducers from './reducers';
import App from './components/App';
import { DataProvider } from './context/DataContext';

/* eslint-disable no-underscore-dangle */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
/* eslint-enable */

const store = createStore(reducers, /* preloadedState, */ composeEnhancers(
  applyMiddleware(thunk),
));

export default (initialData) => {
  render(
    <Provider store={store}>
      <DataProvider value={initialData}>
        <App />
      </DataProvider>
    </Provider>,
    document.getElementById('chat'),
  );
};
