const request = async <T>(url: string, config: any): Promise<T> => {
  const response = await fetch(`${process.env.BACKEND_URL}${url}`, config);
  if (!response.ok) {
    throw new Error("Bad request");
  }
  return await response.json();
};

export default request;
