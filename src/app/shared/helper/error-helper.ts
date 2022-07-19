export function prepareErrosList(errors: { [key: string]: string[] }) {
  let list = [];
  if (typeof errors === 'string') return [errors];

  for (const [_, value] of Object.entries(errors)) {
    list.push(value[0]);
  }

  return list;
}
