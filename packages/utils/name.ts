export const kabeCaseToPascalCase = (name: string) => {
  return name
    .split('-')
    .map((item: string) => {
      return item[0].toUpperCase() + item.slice(1)
    })
    .join('')
}
