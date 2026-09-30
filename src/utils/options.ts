import { isFunction, isPlainObject } from "./common";

function toValue(t: any, ...args: any[]) {
  if (isFunction(t)) return t(...args);
  if (isPlainObject(t)) {
    const t1: Record<string, any> = {};
    Object.entries(t).forEach(([k, v]) => {
      t1[k] = toValue(v, ...args);
    });
    return t1;
  }
  return t;
}
function toValueList(ts: any[], ...args: any[]) {
  if (Array.isArray(ts)) {
    return ts.map((t) => toValue(t, ...args));
  }
  return [];
}
function deepAssign<T>(base: any, obj: any): T {
  if (obj === undefined || obj === null) return base;
  if (!isPlainObject(base) || !isPlainObject(obj)) return obj;
  Object.entries(obj).forEach(([k, v]) => {
    if (Object.prototype.hasOwnProperty.call(base, k)) {
      if (isPlainObject(v) && isPlainObject(base[k])) {
        deepAssign(base[k], obj[k]);
      } else {
        base[k] = obj[k];
      }
    } else {
      base[k] = obj[k];
    }
  });
  return base;
}
function deepAssignList(bases: any[], objs: any[]) {
  if (Array.isArray(bases) && Array.isArray(objs)) {
    return bases.map((base, index) => {
      return deepAssign(base, objs[index]);
    });
  }
  return [];
}
function deepClone(obj: any, map = new WeakMap()) {
  // 原始类型 和 函数 都直接返回
  if (obj === null || typeof obj !== "object") return obj;

  // 函数：直接复用引用（不拷贝函数体）
  if (typeof obj === "function") return obj;

  if (map.has(obj)) return map.get(obj);

  if (obj instanceof Date) {
    const c = new Date(obj);
    map.set(obj, c);
    return c;
  }

  if (obj instanceof RegExp) {
    const c = new RegExp(obj.source, obj.flags);
    map.set(obj, c);
    return c;
  }

  if (obj instanceof Map) {
    const c = new Map();
    map.set(obj, c);
    obj.forEach((v, k) => c.set(deepClone(k, map), deepClone(v, map)));
    return c;
  }

  if (obj instanceof Set) {
    const c = new Set();
    map.set(obj, c);
    obj.forEach((v) => c.add(deepClone(v, map)));
    return c;
  }

  const clone = Array.isArray(obj) ? [] : Object.create(Object.getPrototypeOf(obj));
  map.set(obj, clone);

  Reflect.ownKeys(obj).forEach((key) => {
    const desc = Object.getOwnPropertyDescriptor(obj, key);
    if (desc && desc.enumerable) {
      clone[key] = deepClone(obj[key], map);
    }
  });

  return clone;
}
export { toValue, toValueList, deepAssign, deepAssignList, deepClone };
