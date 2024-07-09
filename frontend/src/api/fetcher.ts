import { baseURL } from "./endpoints";

const fetcher = async (
  url: string,
  options: RequestInit = {}
): Promise<any> => {
  const defaultHeaders: HeadersInit = {
    "Content-Type": "application/json",
  };

  // if (session.isLoggedIn && session.accessToken) {
  //   defaultHeaders["Authorization"] = `Bearer ${session.accessToken}`;
  // } else {
  //   // toast.error("Access denied");
  // }

  const config: RequestInit = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  };

  const response = await fetch(`${baseURL}${url}`, config);

  const data = await response.json();

  console.log(data);

  let error;
  let message;

  if (!response.ok) {
    return {
      error: true,
      message: data.message,
      data: {},
    };
  }

  // if (!data.success) {
  //   throw new Error(data.message || "Request failed with no error message");
  // }

  return { error, message, data: data };
};

export default fetcher;
