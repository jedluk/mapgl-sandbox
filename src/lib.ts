import { Maybe } from "./types";

export function defaultsTo<T, S>(
  value: Maybe<T> | undefined,
  defaultValue: S
): T | S {
  return value === null || value === undefined ? defaultValue : value;
}

export function keys<T extends Record<string, unknown>>(o: T): (keyof T)[] {
  return Object.keys(o) as (keyof T)[];
}

export function isNull(x: unknown): x is null {
  return x === null;
}

export function isNotNull<T>(x: T | null): x is T {
  return x !== null;
}

export function isUndefined<T>(x: T | undefined): x is undefined {
  return x === undefined;
}

export function isNotUndefined<T>(x: T | undefined): x is T {
  return x !== undefined;
}

export function isNotEmpty(value: ArrayLike<unknown>): boolean {
  return value.length > 0;
}

export function isEmpty(value: ArrayLike<unknown>): boolean {
  return value.length === 0;
}

export function isNumber(value: unknown): value is number {
  return typeof value === "number";
}

export function isString(value: unknown): value is string {
  return typeof value === "string";
}

export function isObject(o: unknown): o is object {
  return o instanceof Object && o.constructor === Object;
}

export function joinClassNames(...classNames: (string | undefined)[]): string {
  return classNames.filter(Boolean).join(" ");
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function noop(...args: unknown[]): void {
  return;
}
