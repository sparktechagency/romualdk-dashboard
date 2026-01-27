// import { createApi } from "@reduxjs/toolkit/query/react";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
 
    baseUrl: "https://api.goconnecte.com/api/v1",    
    // baseUrl: "http://10.10.7.41:5000/api/v1",    
    // baseUrl: "http://10.10.7.46:5003/api/v1",    
    prepareHeaders: (headers) => {
      // headers.set("ngrok-skip-browser-warning", "true");
      const token = Cookies.get("accessToken");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
    credentials: "include",
  }),
  endpoints: () => ({}),
  tagTypes: ["user", "notifications", "admin", "category", "verification", "host-request", "host", "car"],
});

export const imageUrl = "https://api.goconnecte.com";
// export const imageUrl = "http://10.10.7.41:5000";
