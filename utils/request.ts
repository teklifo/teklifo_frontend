const request = async <T>(url: string, config: any): Promise<T> => {
  const response = await fetch(`${process.env.BACKEND_URL}${url}`, config);
  return await response.json();
};

export default request;
