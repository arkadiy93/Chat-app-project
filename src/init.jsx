import '@babel/polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import io from 'socket.io-client';
import cookies from 'js-cookie';
import reducers from './reducers';
import App from './components/App';
import { DataProvider } from './context/DataContext';
import * as actions from './actions';

const initializeProject = (store, initialData) => {
  const { messages, channels } = initialData;
  const socket = io();
  socket.on('newMessage', ({ data }) => {
    const { attributes } = data;
    store.dispatch(actions.addMessageToList({ attributes }));
  });
  socket.on('newChannel', ({ data }) => {
    const { attributes } = data;
    store.dispatch(actions.addChannelToList({ attributes }));
  });
  store.dispatch(actions.initializeMessageList({ messages }));
  store.dispatch(actions.initializeChannelList({ channels }));
};

export default (initialData) => {
  const author = cookies.get('name');
  /* eslint-disable no-underscore-dangle */
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  /* eslint-enable */
  const store = createStore(reducers, /* preloadedState, */ composeEnhancers(
    applyMiddleware(thunk),
  ));
  initializeProject(store, initialData);


  render(
    <Provider store={store}>
      <DataProvider value={author}>
        <App />
      </DataProvider>
    </Provider>,
    document.getElementById('chat'),
  );
};
