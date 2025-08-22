import http from "./configServices/httpService";
import { base_url } from "./configServices/config";

// Start Auth
export const registerAuthService = (data) => {
  return http.post(`${base_url}/auth/register`, data);
};
export const loginAuthService = (data) => {
  return http.post(`${base_url}/auth/login`, data);
};
export const forgotPasswordAuthService = (data) => {
  return http.post(`${base_url}/auth/forgot-password`, data);
};
// End Auth

// Start Change Password
export const changePasswordAuthService = (data) => {
  return http.post(`${base_url}/user/change-password`, data);
};
// End Change Password

// Start Info
export const getInfoUserService = () => {
  return http.get(`${base_url}/user/info`);
};
export const editInfoUserService = (data) => {
  return http.put(`${base_url}/user/info`, data);
};
// End Info

// Start Upload
export const uploadUserService = (data, params) => {
  return http.post(`${base_url}/user/upload`, data, {
    params,
    headers: { "Content-Type": "multipart/form-data" },
  });
};
// End Upload

// Start Meta
export const getMetaUserService = () => {
  return http.get(`${base_url}/user/meta`);
};
// End Meta

// Start Overview
export const getOverviewUserService = () => {
  return http.get(`${base_url}/user/overview`);
};
// End Overview
