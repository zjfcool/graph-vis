import { Theme } from "../types";
import { REGISTRY_EXTENSION } from "./store";
import { RegistryExtension, Category } from "./type";

function register<T extends Category>(
  category: T,
  type: string,
  obj: RegistryExtension[T][string],
) {
  const ops = REGISTRY_EXTENSION[category][type];
  if (ops) {
    console.warn(`${category} ${type} has been registered before, and will be overridden.`);
  }
  Object.assign(REGISTRY_EXTENSION[category], { [type]: obj });
}
function registerTheme(type: string, obj: Theme) {
  register("theme", type, obj);
}
export { register, registerTheme };
