import { ALL } from './actions';

export default class AppPermission {
  /**
   *
   * @param {AppEntity} entity
   * @param {AppPermissionAction} action
   */
  constructor(entity, action) {
    this.entity = entity;
    this.action = action;
  }

  getPermissionName() {
    return `${this.entity.machineName}_${this.action.machineName}`;
  }

  getWildcardPermissionName() {
    return `${this.entity.machineName}_${ALL.machineName}`;
  }
}
