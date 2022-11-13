import mockData from './mockData';
import * as t from './actionPaths';
import api from '../../../lib/restClient/api';

export const fetchUsers = () => dispatch => {
  dispatch({ type: t.SET_LOADING, payload: true });
  return api.users.listUsers().then(response => {
    console.log(response);
    dispatch({ type: t.SET_USERS, payload: mockData });
    dispatch({ type: t.SET_LOADING, payload: false });
  });
};
