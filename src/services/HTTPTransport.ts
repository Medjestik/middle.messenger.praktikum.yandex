enum METHOD {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE'
}

type Options = {
  method: METHOD
  data?: unknown
  headers?: Record<string, string>
  timeout?: number
  withCredentials?: boolean
  responseType?: 'json'
}

function queryStringify(data: Record<string, any>): string {
  if (typeof data !== 'object') {
    throw new Error('Data must be object');
  }

  const keys = Object.keys(data);
  return keys.reduce((result, key, index) => `${result}${key}=${data[key]}${index < keys.length - 1 ? '&' : ''}`, '?');
}

type HTTPMethod = (url: string, options?: Options | {}) => Promise<unknown>

class HTTPTransport {
  get: HTTPMethod = (url, options = {}) => this.request(url, { ...options, method: METHOD.GET });

  post: HTTPMethod = (url, options = {}) => this.request(url, { ...options, method: METHOD.POST });

  put: HTTPMethod = (url, options = {}) => this.request(url, { ...options, method: METHOD.PUT });

  delete: HTTPMethod = (url, options = {}) => this.request(url, { ...options, method: METHOD.DELETE });

  constructor(private apiUrl: string) {
    this.apiUrl = apiUrl;
  }

  request = (url: string, options: Options) => {
    const {
      headers = {},
      method,
      data,
      timeout = 60000,
      withCredentials = true,
      responseType = 'json',
    } = options;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      const isGet = method === METHOD.GET;

      xhr.open(
        method,
        isGet && !!data
          ? `${this.apiUrl}${url}${queryStringify(data)}`
          : `${this.apiUrl}${url}`,
      );

      Object.keys(headers).forEach((key) => {
        xhr.setRequestHeader(key, headers[key]);
      });

      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          resolve(xhr.response);
        } else {
          reject(xhr.response);
        }
      };

      xhr.onabort = reject;
      xhr.onerror = reject;
      xhr.timeout = timeout;
      xhr.withCredentials = withCredentials;
      xhr.responseType = responseType;
      xhr.ontimeout = reject;

      if (method === METHOD.GET || !data) {
        xhr.send();
      } else if (data instanceof FormData) {
        xhr.send(data);
      } else {
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify(data));
      }
    });
  };
}

export default HTTPTransport;
