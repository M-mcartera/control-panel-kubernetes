import * as t from './actionPaths';
import api from '../../../lib/restClient/api';

export const fetchUsers = () => dispatch => {
  dispatch({ type: t.SET_LOADING, payload: true });
  return api.users.listUsers().then(({ status, json }) => {
    if (status === 200) {
      dispatch({ type: t.SET_USERS, payload: json.data });
    }
    dispatch({ type: t.SET_LOADING, payload: false });
  });
};
