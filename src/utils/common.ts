function getType(obj: any) {
  return Object.prototype.toString.call(obj).slice(8, -1).toLowerCase();
}
function isFunction<T>(fn: T): fn is T & ((...args: any[]) => any) {
  return typeof fn === "function";
}
function isArray(v: any) {
  return Array.isArray(v);
}
function isObject(obj: any) {
  return getType(obj) === "object";
}
function isText(t: any) {
  if (getType(t) === "string" || getType(t) === "number") return true;
  if (isObject(t) && t.hasOwnProperty("toString") && isFunction(t.toString)) return true;
  return false;
}
// 判断obj是否为纯对象（原型指向null或对象表达式或者new Object()）
function isPlainObject(obj: any) {
  if (obj === null || typeof obj !== "object") return false;
  let proto = Object.getPrototypeOf(obj);
  if (proto === null) return true; // 允许 Object.create(null)
  return proto === Object.prototype && obj.constructor === Object;
}
function debounce(fn: (...args: any[]) => void, delay: number = 200) {
  let timer: number;
  return function (...args: any[]) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      fn(...args);
    }, delay);
  };
}
type NonNull<T> = Exclude<T, null | undefined>;

/**
 * 从对象中排除指定的属性，返回一个新对象。
 * @param obj 源对象（可为 null 或 undefined）
 * @param keys 要排除的属性名列表
 * @returns 排除指定属性后的新对象；若 obj 为 null/undefined，返回 {}
 */
function omit<T extends object | null | undefined, K extends string>(
  obj: T,
  ...keys: K[]
): T extends null | undefined ? {} : Omit<NonNull<T>, K> {
  if (obj == null) return {} as any;
  const keySet = new Set<string>(keys);
  const result: any = {};
  for (const key of Object.keys(obj)) {
    if (!keySet.has(key)) {
      result[key] = (obj as any)[key];
    }
  }
  return result;
}
export { isFunction, isArray, isObject, isText, isPlainObject, debounce, omit };
