import { connect } from 'react-redux';
import React from 'react';
import { withRouter } from 'react-router-dom';
import { fetchUsers, deleteUser } from '../store/actions';

const mapStateToProps = state => ({
  users: state.users.users
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  onLoad: () => {
    dispatch(fetchUsers());
  },
  deleteUser: username => {
    dispatch(deleteUser(username, ownProps.history, 'listing'));
    setTimeout(() => {
      dispatch(fetchUsers());
    }, 1000);
  }
});

const UsersListViewContainer = ({ children, ...props }) =>
  React.cloneElement(children, props);

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(UsersListViewContainer)
);
