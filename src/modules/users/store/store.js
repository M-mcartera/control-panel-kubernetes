import * as t from './actionPaths';

const initialValues = {
  loading: false,
  editUser: null,
  roles: [],
  users: []
};

export default (state = initialValues, action) => {
  switch (action.type) {
    case t.SET_LOADING: {
      return { ...state, loading: action.payload };
    }
    case t.SET_USERS: {
      return { ...state, users: action.payload };
    }
    case t.SET_USER: {
      return { ...state, editUser: action.payload };
    }
    case t.SET_ROLES: {
      return { ...state, roles: action.payload };
    }
    default:
      return state;
  }
};
