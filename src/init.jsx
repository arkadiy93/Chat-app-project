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
  socket.on('newMessage', ({ data: { attributes } }) => {
    store.dispatch(actions.addMessageToList({ attributes }));
  })
    .on('newChannel', ({ data: { attributes } }) => {
      store.dispatch(actions.addChannelToList({ attributes }));
    })
    .on('removeChannel', ({ data: { id } }) => {
      store.dispatch(actions.removeChannelFromList({ id }));
    })
    .on('renameChannel', ({ data: { attributes: { id, name } } }) => {
      const data = { id, name };
      store.dispatch(actions.renameTargetedChannel({ data }));
    });
  store.dispatch(actions.initializeMessageList({ messages }));
  store.dispatch(actions.initializeChannelList({ channels }));
};

export default (initialData) => {
  const author = cookies.get('name');
  /* eslint-disable no-underscore-dangle */
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  /* eslint-enable */
  const store = createStore(reducers, composeEnhancers(
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
