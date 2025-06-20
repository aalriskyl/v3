import axios, { AxiosResponse } from "axios";
import { ID, Response } from "@metronic/helpers";
import { PlanProductionModel, UsersQueryResponse } from "./_models";
import axiosInstance from "../../../../../../../../service/axiosInstance";

const API_URL = import.meta.env.VITE_APP_THEME_API_URL;
const USER_URL = `${API_URL}/user`;
const GET_USERS_URL = `${API_URL}/users/query`;

const getUsers = (query: string): Promise<UsersQueryResponse> => {
  return axios
    .get(`${GET_USERS_URL}?${query}`)
    .then((d: AxiosResponse<UsersQueryResponse>) => d.data);
};

const getUserById = (id: ID): Promise<PlanProductionModel | undefined> => {
  return axios
    .get(`${USER_URL}/${id}`)
    .then((response: AxiosResponse<Response<PlanProductionModel>>) => response.data)
    .then((response: Response<PlanProductionModel>) => response.data);
};

const createUser = (user: PlanProductionModel): Promise<PlanProductionModel | undefined> => {
  return axios
    .put(USER_URL, user)
    .then((response: AxiosResponse<Response<PlanProductionModel>>) => response.data)
    .then((response: Response<PlanProductionModel>) => response.data);
};

const updateUser = (user: PlanProductionModel): Promise<PlanProductionModel | undefined> => {
  return axios
    .post(`${USER_URL}/${user.id}`, user)
    .then((response: AxiosResponse<Response<PlanProductionModel>>) => response.data)
    .then((response: Response<PlanProductionModel>) => response.data);
};

const deleteUser = (userId: ID): Promise<void> => {
  return axios.delete(`${USER_URL}/${userId}`).then(() => {});
};

const deleteSelectedUsers = (userIds: Array<ID>): Promise<void> => {
  const requests = userIds.map((id) => axios.delete(`${USER_URL}/${id}`));
  return axios.all(requests).then(() => {});
};

interface PlanProductionData {
  id?: string;
  bill_of_materials: string;
  tanggal_produksi: Date;
  jumlah_produksi: string;
  jenis_buffer_stock: string;
  buffer_stock: string;
}

export const createPlanProduction = async (data: PlanProductionData) => {
  const response = await axiosInstance.post('/plan-production', data);
  return response.data;
};

export const updatePlanProduction = async (id: string, data: PlanProductionData) => {
  const response = await axiosInstance.put(`/plan-production/${id}`, data);
  return response.data;
};

export {
  getUsers,
  deleteUser,
  deleteSelectedUsers,
  getUserById,
  createUser,
  updateUser,
};
