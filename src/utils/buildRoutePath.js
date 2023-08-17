export function buildRoutePath(path) {
  const pathWithParams = path.replaceAll(/:([a-zA-Z]+)/g, '(?<$1>[a-zA-Z0-9\-_]+)')
  const pathRegex = new RegExp(`^${pathWithParams}`)

  return pathRegex
}