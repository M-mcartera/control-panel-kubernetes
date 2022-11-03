import * as ACTIONS from '../auth/actions';
import AppPermission from '../auth/AppPermission';
import * as ENTITIES from '../auth/entities';

export default {
  READ_USERS: new AppPermission(ENTITIES.Users, ACTIONS.READ),
  MANAGE_USERS: new AppPermission(ENTITIES.Users, ACTIONS.MANAGE)
};
