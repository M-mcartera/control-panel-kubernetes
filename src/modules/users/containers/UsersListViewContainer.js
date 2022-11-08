import { connect } from 'react-redux';
import React from 'react';
import { withRouter } from 'react-router-dom';
import { fetchUsers } from '../store/actions';

const mapStateToProps = state => ({
  users: state.users.users
});

const mapDispatchToProps = dispatch => ({
  onLoad: () => {
    dispatch(fetchUsers());
  }
});

const UsersListViewContainer = ({ children, ...props }) =>
  React.cloneElement(children, props);

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(UsersListViewContainer)
);
