import '@babel/polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import io from 'socket.io-client';
import reducers from './reducers';
import App from './components/App';
import { DataProvider } from './context/DataContext';
import { addMessageToList, initializeMessageList } from './actions/index';

const socket = io();

/* eslint-disable no-underscore-dangle */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
/* eslint-enable */

const store = createStore(reducers, /* preloadedState, */ composeEnhancers(
  applyMiddleware(thunk),
));

socket.on('newMessage', ({ data }) => {
  const { attributes } = data;
  store.dispatch(addMessageToList({ attributes }));
});


export default (initialData) => {
  const { messages } = initialData;
  store.dispatch(initializeMessageList({ messages }));
  render(
    <Provider store={store}>
      <DataProvider value={initialData}>
        <App />
      </DataProvider>
    </Provider>,
    document.getElementById('chat'),
  );
};
