import React from 'react';
import canAccess from './canAccess';

/**
 *
 * @param {AppPermission|undefined} permission
 * @param children
 * @return {*|boolean}
 * @constructor
 */
const RouteGuard = ({ permission, children }) => {
  if (!permission || canAccess(permission)) {
    return children;
  }

  return <h1>not found</h1>;
};

export default RouteGuard;
