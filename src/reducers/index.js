import { combineReducers } from 'redux';
import usersStore from '../modules/users/store/store';

const allReducers = combineReducers({
  users: usersStore
});
export default allReducers;
