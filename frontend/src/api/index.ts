import fetcher from "./fetcher";

// GET request
export const getRequest = async (url: string): Promise<any> => {
  return fetcher(url, { method: "GET" });
};

// POST request
export const postRequest = async (url: string, body?: any): Promise<any> => {
  return fetcher(url, {
    method: "POST",
    body: JSON.stringify(body),
  });
};

// PATCH request
export const patchRequest = async (url: string, body: any): Promise<any> => {
  return fetcher(url, {
    method: "PATCH",
    body: JSON.stringify(body),
  });
};

// DELETE request
export const deleteRequest = async (url: string): Promise<any> => {
  return fetcher(url, { method: "DELETE" });
};
