import { type BuiltInParserName, format } from 'prettier'
import { readFile } from 'fs/promises'
import { prettircPath } from './paths'

async function getPrettierConfig() {
  return JSON.parse(
    await readFile(prettircPath, {
      encoding: 'utf-8',
    }),
  )
}

export const formatCode = async (
  code: string,
  parser: BuiltInParserName = 'typescript',
) => {
  return format(code, {
    parser,
    ...(await getPrettierConfig()),
  })
}
