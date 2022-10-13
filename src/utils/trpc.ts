import { createReactQueryHooks } from '@trpc/react';
export const trpc = createReactQueryHooks();
// => { useQuery: ..., useMutation: ...}

export type TQuery = 'members.getAll';

export type TUseQuery = [
  TQuery, // we use the already existing TQuery type which holds all possible querys
  Record<string, any>, // We use a Record to type the Object consisting of keys in the form of strings and any possible input.
];
