// reducers/index.js (rootReducer.js)
import { combineReducers } from 'redux';
import expensesReducer from './Favourites';

const rootReducer = combineReducers({
  authenticationInfo: expensesReducer,
});

export default rootReducer;
