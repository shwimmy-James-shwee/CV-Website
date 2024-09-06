import { parseResolveInfo, ResolveTree } from 'graphql-parse-resolve-info';
import { GraphQLResolveInfo } from 'graphql';
import { EntityName, FieldsRequested, RelationField, relationFields } from '@/services/crud.service';

/**
 * Given a string, assume it's a plural form of an entity,
 * return the singular-form of that string (if applicable).
 *
 * GraphQL Schema contains fields that aren't directly related
 * to certain entities. For example, "userCreated" can refer to
 * "User" entity, "employeesAffected" can refer to an array of "Employee"s
 * entity, "alertsUnopened" can refer to an array of "UserNotification" entity, etc.
 *
 * We need a way to map the relationships between the names of these fields
 * and the actual entities they're referring to.
 */
export const mapNodeWithPluralNameToSingularEntityName = (args: string): string => {
  if (args === 'UserActivityLogs') return 'UserActivityLog';
  if (args === 'SignInLogs') return 'SignInLog';
  if (args === 'UserNotifications') return 'UserNotification';
  if (args === 'MemberOfBusinessUnits') return 'Member';
  return args;
};

export type ExtractFieldsArgs = { resolveTree: ResolveTree; entityName: EntityName };
export const extractFields = (args: ExtractFieldsArgs): FieldsRequested => {
  const { resolveTree, entityName } = args;
  const entityFields: FieldsRequested = { mainFields: [] };
  if (!resolveTree.fieldsByTypeName?.[entityName]) {
    return entityFields;
  }

  const fieldsRequested = Object.keys(resolveTree.fieldsByTypeName[entityName]);

  for (const field of fieldsRequested) {
    const _field = field as RelationField;

    if (relationFields.includes(_field)) {
      if (resolveTree?.fieldsByTypeName) {
        if (resolveTree?.fieldsByTypeName[entityName][_field]) {
          const nestedResolveTree = resolveTree?.fieldsByTypeName[entityName][_field];

          const nestedFields = extractFields({
            resolveTree: nestedResolveTree,
            entityName: mapNodeWithPluralNameToSingularEntityName(_field) as EntityName,
          });

          if (nestedFields && Object.keys(nestedFields).length > 0) {
            entityFields[_field] = nestedFields;
          }
          continue;
        }
      }
    }
    entityFields.mainFields = [...entityFields?.mainFields, field];
  }
  return entityFields;
};

export type GetFieldsRequestedForFindManyArgs = {
  info: GraphQLResolveInfo;
  responseType: string;
  rootFieldEntityName: EntityName;
};
export const getFieldsRequestedForFindMany = (args: GetFieldsRequestedForFindManyArgs): FieldsRequested => {
  const { info, responseType, rootFieldEntityName } = args;

  const parsedResolveInfo = parseResolveInfo(info) as ResolveTree;

  const fieldsRequested: FieldsRequested = {
    mainFields: [],
  };

  if (parsedResolveInfo) {
    if (parsedResolveInfo?.fieldsByTypeName[responseType]) {
      if (parsedResolveInfo?.fieldsByTypeName[responseType]['items']) {
        const resolveTree = parsedResolveInfo?.fieldsByTypeName[responseType]['items'];
        return extractFields({
          resolveTree,
          entityName: rootFieldEntityName,
        });
      }
    }
  }

  return fieldsRequested;
};
