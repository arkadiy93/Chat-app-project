// import { omit, keyBy } from 'lodash';
import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
// import { reducer as formReducer } from 'redux-form';
import * as actions from '../actions';


const messages = handleActions({
  [actions.sendMessage](state, { payload }) {
    return state;
  },
}, {});


export default combineReducers({
  messages,
});
