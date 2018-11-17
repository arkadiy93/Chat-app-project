import { createSelector } from 'reselect';

const getData = state => state.data;

export default createSelector(
  getData,
  data => Object.values(data),
);
