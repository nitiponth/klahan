// utils/trpc.ts
import { createReactQueryHooks } from '@trpc/react';
export const trpc = createReactQueryHooks();
// => { useQuery: ..., useMutation: ...}
