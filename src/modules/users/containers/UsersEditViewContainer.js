import { connect } from 'react-redux';
import React from 'react';
import { withRouter } from 'react-router-dom';
import {
  fetchUser,
  fetchRoles,
  updateUser,
  deleteUser
} from '../store/actions';

const mapStateToProps = state => ({
  user: state.users.editUser,
  roles: state.users.roles
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  onLoad: () => {
    const { id } = ownProps.match.params;
    dispatch(fetchUser(id));
    dispatch(fetchRoles());
  },
  updateUser: data => {
    const { id: username } = ownProps.match.params;
    dispatch(updateUser(username, data));
  },
  deleteUser: () => {
    const { id: username } = ownProps.match.params;
    dispatch(deleteUser(username, ownProps.history));
  }
});

const UsersEditViewContainer = ({ children, ...props }) =>
  React.cloneElement(children, props);

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(UsersEditViewContainer)
);
