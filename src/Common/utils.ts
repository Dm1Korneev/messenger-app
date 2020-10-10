
type Filter = Parameters<typeof Array.prototype.filter>[0]
export const distinct: Filter = (value, index, self) => self.indexOf(value) === index;
