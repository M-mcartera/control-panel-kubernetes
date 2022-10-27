import { Ability, AbilityBuilder } from '@casl/ability';
import * as Entities from '../auth/entities';
import { ALL } from '../auth/actions';
import AppPermission from '..//auth/AppPermission';
import PermissionScope from './PermissionScope';

/**
 *  @typedef {import('@casl/ability').RawRuleOf} RawRuleOf
 */
const ability = new Ability([]);

/**
 *
 * @param {string[]} machineNameRoles
 * @return {RawRuleOf<Ability<A, C>>[]}
 */
const defineRulesFor = machineNameRoles => {
  const abilityBuilder = new AbilityBuilder(Ability);

  // only define abilities for specific permissions that are found in the machineNameRoles
  Object.values(PermissionScope).forEach(permission => {
    if (machineNameRoles.includes(permission.getPermissionName())) {
      abilityBuilder.can(
        permission.action.machineName,
        permission.entity.label
      );
    }
  });

  // check for wildcard permissions ('manage' ability)
  Object.values(Entities).forEach(entity => {
    const wildcardPermission = new AppPermission(entity, ALL);
    if (machineNameRoles.includes(wildcardPermission.getPermissionName())) {
      abilityBuilder.can('manage', entity.label);
    }
  });

  return abilityBuilder.rules;
};

/**
 *
 * @param {string[]} machineNameRoles
 */
export const updateAbilities = machineNameRoles => {
  ability.update(defineRulesFor(machineNameRoles));
};

export default ability;
