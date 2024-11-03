import { createRequire } from 'node:module'
const require = createRequire(import.meta.url)

export default function getJSON (path) {
  return require(path)
}
