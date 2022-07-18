/**
 * update state with id criteria
 */
export function updateState<T extends { id: number }>(
  state: T[],
  id: number,
  change: Partial<T>
): T[] {
  const index = state.findIndex((r) => r.id == id);
  const newObject: T = { ...state[index], ...change };
  const newState: T[] = state.slice(0);
  newState[index] = newObject;
  return <T[]>newState;
}

/**
 * delete object from array  state with id criteria
 */
export function deleteFromState<T extends { id: number }>(
  state: T[],
  id: number
): T[] {
  const index = state.findIndex((r) => r.id == id);
  state.splice(index, 1);
  return state.slice(0);
}

/**
 * add new  object to array
 */
export function addToState<T>(state: T[], newObject: T): T[] {
  state.push(newObject);
  return state.slice(0);
}
