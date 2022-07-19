export function prepareErrosList(errors: { [key: string]: string[] }) {
  let list = [];
  for (const [_, value] of Object.entries(errors)) {
    list.push(value[0]);
  }

  return list;
}
