import * as t from './actionPaths';
import api from '../../../lib/restClient/api';
import { toast } from 'react-toastify';
import { USERS_EDIT, USERS_LISTING } from '../../../routes/RoutePaths';

export const fetchUsers = () => dispatch => {
  dispatch({ type: t.SET_LOADING, payload: true });
  return api.users.listUsers().then(({ status, json }) => {
    if (status === 200) {
      dispatch({ type: t.SET_USERS, payload: json.data });
    }
    dispatch({ type: t.SET_LOADING, payload: false });
  });
};

export const fetchUser = userName => dispatch => {
  dispatch({ type: t.SET_LOADING, payload: true });
  return api.users.getUserDetails(userName).then(({ status, json }) => {
    if (status === 200) {
      dispatch({ type: t.SET_USER, payload: json.data });
    }
    dispatch({ type: t.SET_LOADING, payload: false });
  });
};

export const fetchRoles = () => dispatch => {
  dispatch({ type: t.SET_LOADING, payload: true });
  return api.roles.listRoles().then(({ status, json }) => {
    if (status === 200) {
      dispatch({ type: t.SET_ROLES, payload: json.data });
    }
    dispatch({ type: t.SET_LOADING, payload: false });
  });
};

export const updateUser = (username, data) => dispatch => {
  dispatch({ type: t.SET_LOADING, payload: true });
  return api.users.updateUser(username, data).then(({ status, json }) => {
    if (status === 200) {
      dispatch({ type: t.SET_USER, payload: json.data });
      toast.success('Successfully updated user');
    }
    dispatch({ type: t.SET_LOADING, payload: false });
  });
};

export const deleteUser =
  (username, history, path = 'edit') =>
  dispatch => {
    dispatch({ type: t.SET_LOADING, payload: true });
    return api.users.deleteUser(username).then(({ status }) => {
      if (status === 200) {
        toast.success('Successfully deleted user');
        if (path === 'edit') {
          history.push(USERS_LISTING);
        }
      }
    });
  };

export const setNewUserLayout = payload => ({
  type: t.SET_NEW_USER_LAYOUT,
  payload
});

export const createUser = (data, history) => dispatch => {
  dispatch({ type: t.SET_LOADING, payload: true });
  return api.users.createUser(data).then(({ json, status }) => {
    if (status === 200) {
      toast.success('User successfully created');
    } else {
      toast.error(json.msg);
    }
    dispatch({ type: t.SET_LOADING, payload: false });
    history.push(USERS_EDIT.replace(':id', data.username));
  });
};

export const resetUser = () => ({
  type: t.RESET_USER
});
