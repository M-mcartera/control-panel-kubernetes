import { connect } from 'react-redux';
import React from 'react';
import { withRouter } from 'react-router-dom';
import { fetchUser, fetchRoles } from '../store/actions';

const mapStateToProps = state => ({
  users: state.users.users
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  onLoad: () => {
    const { id } = ownProps.match.params;
    dispatch(fetchUser(id));
    dispatch(fetchRoles());
  }
});

const UsersEditViewContainer = ({ children, ...props }) =>
  React.cloneElement(children, props);

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(UsersEditViewContainer)
);
