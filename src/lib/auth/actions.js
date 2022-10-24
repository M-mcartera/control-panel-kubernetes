import AppPermissionAction from './AppPermissionAction';

export const READ = new AppPermissionAction('Read', 'r');
export const MANAGE = new AppPermissionAction('Manage', 'm');
export const ALL = new AppPermissionAction('All actions', 'a');
