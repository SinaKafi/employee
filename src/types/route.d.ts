import paths from '@/router/paths';

export type DeepPaths<T> = {
  [K in keyof T]: T[K] extends string ? T[K] : DeepPaths<T[K]>;
}[keyof T];

export type PathValues = DeepPaths<typeof paths>;

export type GuardFnResult = true | PathValues;
