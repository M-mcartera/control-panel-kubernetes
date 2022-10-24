import abilities from './abilities';

/**
 *
 * @param {AppPermission} permission
 * @return {boolean}
 */
export default permission => {
  return abilities.can(permission.action.machineName, permission.entity.label);
};
