export const requestInterceptor = (config) => {
    const customHeaders = {
      'Authorization': 'Bearer YourAccessToken',
      'Custom-Header': 'CustomHeaderValue',
    };
  
    config.headers = {
      ...config.headers,
      ...customHeaders,
    };
  
    return config;
  };

export const errorInterceptor = (error) => {
    return Promise.reject(error);
};