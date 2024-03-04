import { DBResponse } from "@/types/data/dbResponse";


  async function fetchGet<T>(url: string, token?: string, headers: Record<string, string> = {}): Promise<DBResponse<T>> {
    return fetchWrapper<DBResponse<T>>(url, 'GET', token, undefined, headers);
  }
  
  async function fetchPost<T, BodyType>(url: string, body: BodyType, token?: string, headers: Record<string, string> = {}): Promise<DBResponse<T>> {
    return fetchWrapper<DBResponse<T>, BodyType>(url, 'POST', token, body, headers);
  }
  
  async function fetchPut<T, BodyType>(url: string, body: BodyType, token?: string, headers: Record<string, string> = {}): Promise<DBResponse<T>> {
    return fetchWrapper<DBResponse<T>, BodyType>(url, 'PUT', token, body, headers);
  }
  
  async function fetchDelete<T>(url: string, token?: string, headers: Record<string, string> = {}): Promise<DBResponse<T>> {
    return fetchWrapper<DBResponse<T>>(url, 'DELETE', token, undefined, headers);
  }
  
  async function fetchWrapper<ResponseType, BodyType = undefined>(
    url: string,
    method: "GET" | "POST" | "PUT" | "DELETE",
    token?: string,
    body?: BodyType,
    headers: Record<string, string> = {}
  ): Promise<ResponseType> {
    if (body && !headers['Content-Type']) {
      headers['Content-Type'] = 'application/json';
    }
  
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
  
    let options: RequestInit = {
      method,
      headers,
      body: body !== undefined ? JSON.stringify(body) : null,
    };
  
    if (method === "GET" || method === "DELETE") {
      delete options.body;
    }
  
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, options);
  
    if (!response.ok) {
      throw new Error(`Error: status code ${response.status}`);
    }
  
    return response.json() as Promise<ResponseType>;
  }
  
  export { fetchGet, fetchPost, fetchPut, fetchDelete };
  