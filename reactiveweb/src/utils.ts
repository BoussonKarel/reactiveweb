import type { ArgsWrapper, Thunk } from 'ember-resources';

export const DEFAULT_THUNK = () => [];

export function normalizeThunk(thunk?: Thunk): ArgsWrapper {
  if (!thunk) {
    return { named: {}, positional: [] };
  }

  let args = thunk();

  if (Array.isArray(args)) {
    return { named: {}, positional: args };
  }

  if (!args) {
    return { named: {}, positional: [] };
  }

  /**
   * Hopefully people aren't using args named "named"
   */
  if ('positional' in args || 'named' in args) {
    return args;
  }

  return { named: args as Record<string, unknown>, positional: [] };
}
