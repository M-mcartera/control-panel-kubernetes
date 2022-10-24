import canAccess from './canAccess';

/**
 *
 * @param {AppPermission} permission
 * @param children
 * @return {*|boolean}
 * @constructor
 */
const PermissionGuard = ({ permission, children }) => {
  return canAccess(permission) && children;
};

export default PermissionGuard;
