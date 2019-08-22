export function distinct(value: any, index: number, self: Array<any>): boolean {
  return self.indexOf(value) === index;
}
