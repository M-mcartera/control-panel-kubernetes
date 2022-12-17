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
    case t.SET_NEW_USER_LAYOUT: {
      return { ...state, editUser: { isNew: action.payload } };
    }
    case t.RESET_USER: {
      return { ...state, editUser: null };
    }
    default:
      return state;
  }
};
