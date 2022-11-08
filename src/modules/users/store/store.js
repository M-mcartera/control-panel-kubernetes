import * as t from './actionPaths';

const initialValues = {
  loading: false,
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
    default:
      return state;
  }
};
