import axios, { AxiosResponse } from "axios";
import { ID, Response } from "@metronic/helpers";
import { Model, UsersQueryResponse } from "./_models";
import axiosInstance from "../../../../../../../../../service/axiosInstance";

const API_URL = import.meta.env.VITE_APP_THEME_API_URL;
const USER_URL = `${API_URL}/user`;
const GET_USERS_URL = `${API_URL}/users/query`;

const getUsers = (query: string): Promise<UsersQueryResponse> => {
  return axios
    .get(`${GET_USERS_URL}?${query}`)
    .then((d: AxiosResponse<UsersQueryResponse>) => d.data);
};

const getUserById = (id: ID): Promise<Model | undefined> => {
  return axios
    .get(`${USER_URL}/${id}`)
    .then((response: AxiosResponse<Response<Model>>) => response.data)
    .then((response: Response<Model>) => response.data);
};

const createUser = (user: Model): Promise<Model | undefined> => {
  return axios
    .put(USER_URL, user)
    .then((response: AxiosResponse<Response<Model>>) => response.data)
    .then((response: Response<Model>) => response.data);
};

const updateUser = (user: Model): Promise<Model | undefined> => {
  return axios
    .post(`${USER_URL}/${user.id}`, user)
    .then((response: AxiosResponse<Response<Model>>) => response.data)
    .then((response: Response<Model>) => response.data);
};

const deleteUser = (userId: ID): Promise<void> => {
  return axios.delete(`${USER_URL}/${userId}`).then(() => {});
};

const deleteSelectedUsers = (userIds: Array<ID>): Promise<void> => {
  const requests = userIds.map((id) => axios.delete(`${USER_URL}/${id}`));
  return axios.all(requests).then(() => {});
};

interface StockOpnameData {
  id?: string;
  opname_date: string;
  approved_by: string;
  request_by: string;
  status: string;
  material: string;
  uom: string;
  actual_stock: number;
  note: string;
}

export const createStockOpname = async (data: StockOpnameData) => {
  const response = await axiosInstance.post('/stock-opname', data);
  return response.data;
};

export const updateStockOpname = async (id: string, data: StockOpnameData) => {
  const response = await axiosInstance.put(`/stock-opname/${id}`, data);
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
