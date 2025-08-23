import http from "./configServices/httpService";
import { base_url } from "./configServices/config";

// Start User
export const getUsersAdminService = (params) => {
  return http.get(`${base_url}/admin/users`, { params });
};
export const createUserAdminService = (data) => {
  return http.post(`${base_url}/admin/user`, data);
};
export const editUserAdminService = (data) => {
  return http.put(`${base_url}/admin/user/${data.id}`, data);
};
export const changeUserConfirmAdminService = (id) => {
  return http.patch(`${base_url}/admin/user/${id}/confirm`);
};
export const changeUserPasswordAdminService = (data) => {
  return http.patch(`${base_url}/admin/user/${data.id}/change-password`, data);
};
export const deleteUserAdminService = (id) => {
  return http.delete(`${base_url}/admin/user/${id}`);
};
// End User
