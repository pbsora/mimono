import { cookies } from "next/headers";

class FetchWrapper {
  baseURL: string;
  constructor() {
    this.baseURL = process.env.CLIENT_URL as string;
  }

  async get(url: string) {
    url = url.charAt(0) === "/" ? url.slice(1) : url;
    return fetch(this.baseURL + url, {
      method: "get",
      credentials: "include",
      headers: {
        Authorization: `Bearer ${
          (await cookies()).get("token")?.value
        };`,
      },
    });
  }

  async post(url: string, data?: unknown) {
    url = url.charAt(0) === "/" ? url.slice(1) : url;
    return fetch(this.baseURL + url, {
      method: "post",
      credentials: "include",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
        Cookie: `token=${
          (await cookies()).get("token")?.value
        }; refresh-token=${
          (await cookies()).get("refresh-token")?.value
        }`,
      },
      body: JSON.stringify(data),
    });
  }

  async put(url: string, data: unknown) {
    url = url.charAt(0) === "/" ? url.slice(1) : url;
    return fetch(this.baseURL + url, {
      method: "put",
      credentials: "include",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
        Cookie: `token=${
          (await cookies()).get("token")?.value
        }`,
      },
      body: JSON.stringify(data),
    });
  }

  async patch(url: string, data?: FormData | unknown) {
    url = url.charAt(0) === "/" ? url.slice(1) : url;
    return fetch(this.baseURL + url, {
      method: "PATCH",
      credentials: "include",
      headers: {
        Cookie: `token=${
          (await cookies()).get("token")?.value
        }`,
      },
      body:
        data instanceof FormData
          ? data
          : JSON.stringify(data),
    });
  }

  async delete(url: string) {
    url = url.charAt(0) === "/" ? url.slice(1) : url;
    return fetch(this.baseURL + url, {
      method: "delete",
      credentials: "include",
      headers: {
        Cookie: `token=${
          (await cookies()).get("token")?.value
        }`,
      },
    });
  }
}

export const API = new FetchWrapper();

export default API;
