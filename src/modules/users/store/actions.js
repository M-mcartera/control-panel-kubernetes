import mockData from './mockData';
import * as t from './actionPaths';

export const fetchUsers = () => dispatch => {
  dispatch({ type: t.SET_LOADING, payload: true });
  dispatch({ type: t.SET_USERS, payload: mockData });
  dispatch({ type: t.SET_LOADING, payload: false });
};
