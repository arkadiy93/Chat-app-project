import { createSelector } from 'reselect';

const getData = state => state.messagesData;

export default createSelector(
  getData,
  data => Object.values(data),
);
