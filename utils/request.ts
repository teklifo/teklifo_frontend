const request = async <T>(
  url: string,
  config: RequestInit = {}
): Promise<T> => {
  const response = await fetch(`${process.env.BACKEND_URL}${url}`, config);
  return await response.json();
};

export default request;
