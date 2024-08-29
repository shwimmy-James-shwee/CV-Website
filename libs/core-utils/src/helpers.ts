export type Nullable<T> = null | undefined | T;

/** Returns true if data is not undefined nor null */
export const isNotUndefinedNotNull = <T>(args: Nullable<T>): args is Exclude<T, undefined | null> => {
  return args !== undefined && args !== null;
};

/** Returns true if data is either undefined or null */
export const isUndefinedOrNull = (args: unknown): args is undefined | null => {
  return args === undefined || args === null;
};

/** Returns true if data is an object without key-values */
export const objectIsEmpty = (args: unknown): args is { [key: string]: never } => {
  return JSON.stringify(args) === '{}';
};

/** Returns true if data is an empty string */
export const stringIsEmpty = (args: string): args is `` => {
  if (typeof args === `string`) {
    return args?.length === 0;
  }
  return false;
};

/** Returns true if data is an empty array */
export const arrayIsEmpty = <T>(args: T[]): args is [] => {
  return args?.length === 0;
};

/** Returns true if data is not an empty array, but it has items in it */
export const arrayIsNotEmpty = <T>(args: T[]): args is [T, ...T[]] => {
  return args?.length > 0;
};

/** Returns true if and only if the input is a number in some shape or form,
 * this includes numbers that are: 0, positive, negative, positive & negative
 * infinity (including decimal points).
 *
 * NaN is not considered a number in this case
 */
export const isNumber = (args: unknown): args is number => {
  return typeof args === `number` && isFinite(args);
};

/** Return true if input is a boolean */
export const isBoolean = (args: unknown): args is boolean => {
  return typeof args === `boolean`;
};

/** Return true if input is a string */
export const isString = (args: unknown): args is string => {
  return typeof args === `string`;
};

/** Returns true if input is strictly a date */
export const isDate = (args: unknown): args is Date => {
  return !isNaN(Date.parse(args as string));
};

/** Returns true if input is an array */
export const isArray = <T>(args: unknown): args is T[] => {
  return Array.isArray(args);
};

/** Checks if input is strictly an object.
 *
 * This is achieved by comparing the first and last character
 * of the converted string, seeing if they have matching braces
 */
export const isObject = (args: unknown): args is Record<string, unknown> => {
  if (isUndefinedOrNull(args)) return false;
  const converted = JSON.stringify(args);
  return converted[0] === `{` && converted[converted.length - 1] === `}`;
};

/** Returns true if input is undefined */
export const isUndefined = <T>(args: Nullable<T>): args is undefined => {
  return args === undefined;
};

/** Returns true if input is not undefined */
export const isNotUndefined = <T>(args: Nullable<T>): args is Exclude<T, undefined> => {
  return args !== undefined;
};

/** Returns true if input is null */
export const isNull = <T>(args: Nullable<T>): args is null => {
  return args === null;
};

/** Returns true if input is not null */
export const isNotNull = <T>(args: Nullable<T>): args is Exclude<T, null> => {
  return args !== null;
};
