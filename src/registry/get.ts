import { REGISTRY_EXTENSION } from "./store";
import { Category, RegistryExtension } from "./type";

function getExtension<C extends Category>(
  category: C,
  type: string,
): RegistryExtension[C][string] | undefined {
  const extension = REGISTRY_EXTENSION[category]?.[type];
  if (extension) {
    return extension as RegistryExtension[C][string];
  }
  return undefined;
}
function getExtensions<C extends Category>(category: C): RegistryExtension[C] | undefined {
  return REGISTRY_EXTENSION[category];
}
function getExtensionsKeys<C extends Category>(category: C): string[] {
  return Object.keys(getExtensions(category) || {});
}
export { getExtension, getExtensions, getExtensionsKeys };
