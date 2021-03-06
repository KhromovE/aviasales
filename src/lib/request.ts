const { API_URL } = process.env

type Method = 'get'
type GetAttr = {
  path: string
  params?: Record<string, any>
}
type RequestAttr = GetAttr & {
  method: Method
}

type Get = <T>({ path, params }: GetAttr) => Promise<T>
type Request = <T>({ method, path, params }: RequestAttr) => Promise<T>

/**
 * make request
 * @param  {string} {method
 * @param  {string} path
 * @param  {object} params}
 * @returns {Promice<T>}
 */
const request: Request = async ({ method, path, params }) => {
  const options: RequestInit = {
    method: method.toUpperCase(),
  }
  const url = new URL(`${API_URL}/${path}`)

  if (params) {
    url.search = new URLSearchParams(params).toString()
  }

  const response = await fetch(url.href, options)

  return response.json()
}
/**
 * make get request
 * @param  {} {path
 * @param  {} params}
 * @returns {Promice<T>}
 */
export const get: Get = ({ path, params }) => request({ method: 'get', path, params })
