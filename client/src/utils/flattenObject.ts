import { GenericObject } from '../types';

export default function flattenObject(
  obj: GenericObject,
  excludeKeys: string[],
  parentKey: string = '',
  result: { name: string; value: any }[] = []
): { name: string; value: any }[] {
  for (const [key, value] of Object.entries(obj)) {
    if (excludeKeys.includes(key)) {
      continue; // Skip excluded keys
    }

    if (value === null || value === undefined) {
      continue;
    }

    const fullKey = parentKey ? `${parentKey}.${key}` : key; // Build nested key
    if (value && typeof value === 'object' && !Array.isArray(value)) {
      flattenObject(value, excludeKeys, fullKey, result); // Recurse if value is an object
    } else {
      result.push({ name: fullKey, value }); // Push object with existing name and value
    }
  }
  return result;
}
