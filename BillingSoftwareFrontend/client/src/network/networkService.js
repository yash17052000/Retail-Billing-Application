import axios from "axios";

// https://dev.to/chafroudtarek/refresh-token-implementation-in-reactjs-53f7
// https://stackoverflow.com/questions/10631042/how-to-generate-access-token-using-refresh-token-through-google-drive-api

const http = axios.create({
  baseURL: "",
  headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJSYWp1IiwiaWF0IjoxNzY5MzMyNjgzLCJleHAiOjE3NjkzMzI3NDN9.wfbZJ2GVd1qn-M8s2Kdl44XRFGGtL9xuXqDONIw4N2Q`
  }
});

// Example token handling interceptors (optional)

/*
http.interceptors.request.use((request) => {
  if (request.options && request.options.WithCredentials) {
    request.withCredentials = true;
  }

  if (request.options && request.options.iscontentSet) {
    delete request.headers["Content-Type"];
  } else if (request.options) {
    request.headers["Content-Type"] = request.options["Content-Type"] || "application/json";
  }

  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  if (timeZone) {
    request.headers["Timezone"] = timeZone;
  }

  return request;
});

const getTokenFromLocalStorage = () => {
  const tokenStr = localStorage.getItem("access_token");
  if (!tokenStr) return null;
  return JSON.parse(tokenStr);
};

http.interceptors.request.use(
  async (config) => {
    const token = getTokenFromLocalStorage();
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

const refreshToken = async () => {
  try {
    const resp = await http.get("auth/refresh");
    console.log("refresh token", resp.data);
    return resp.data;
  } catch (e) {
    console.log("Error", e);
  }
};

http.interceptors.response.use(
  (response) => response,
  async function (error) {
    const originalRequest = error.config;
    if (error.response.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;

      const resp = await refreshToken();
      const access_token = resp.response.accessToken;

      window.localStorage.setItem("access_token", access_token);
      http.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;
      return http(originalRequest);
    }
    return Promise.reject(error);
  }
);
*/

const networkService = {
  // GET Request
  get: async (url, queryParams, options) => {
    const config = {
      method: "GET",
      url,
      params: queryParams,
      ...options,
    };
    return http(config);
  },

  // POST Request
  post: async (url, requestBody, options) => {
    const config = {
      method: "POST",
      url,
      data: requestBody,
      ...options,
    };
    return axios(config);
  },

  // PUT Request
  put: async (url, requestBody, options) => {
    const config = {
      method: "PUT",
      url,
      data: requestBody,
      ...options,
    };
    return axios(config);
  },

  // PATCH Request
  patch: async (url, requestBody, options) => {
    const config = {
      method: "PATCH",
      url,
      data: requestBody,
      ...options,
    };
    return axios(config);
  },

  // DELETE Request
  delete: async (url, queryParams, options) => {
    const config = {
      method: "DELETE",
      url,
      params: queryParams,
      ...options, 
    };
    return axios(config);
  },
};

export default networkService;
