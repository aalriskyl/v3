import axios, { AxiosResponse } from "axios";
import { ID, Response } from "@metronic/helpers";
import { Goods, UsersQueryResponse } from "./_models";

const API_URL = import.meta.env.VITE_APP_THEME_API_URL;
const USER_URL = `${API_URL}/user`;
const GET_USERS_URL = `${API_URL}/users/query`;

const getUsers = (query: string): Promise<UsersQueryResponse> => {
  return axios
    .get(`${GET_USERS_URL}?${query}`)
    .then((d: AxiosResponse<UsersQueryResponse>) => d.data);
};

const getUserById = (id: ID): Promise<Goods | undefined> => {
  return axios
    .get(`${USER_URL}/${id}`)
    .then((response: AxiosResponse<Response<Goods>>) => response.data)
    .then((response: Response<Goods>) => response.data);
};

const createUser = (user: Goods): Promise<Goods | undefined> => {
  return axios
    .put(USER_URL, user)
    .then((response: AxiosResponse<Response<Goods>>) => response.data)
    .then((response: Response<Goods>) => response.data);
};

const updateUser = (user: Goods): Promise<Goods | undefined> => {
  return axios
    .post(`${USER_URL}/${user.id}`, user)
    .then((response: AxiosResponse<Response<Goods>>) => response.data)
    .then((response: Response<Goods>) => response.data);
};

const deleteUser = (userId: ID): Promise<void> => {
  return axios.delete(`${USER_URL}/${userId}`).then(() => {});
};

const deleteSelectedUsers = (userIds: Array<ID>): Promise<void> => {
  const requests = userIds.map((id) => axios.delete(`${USER_URL}/${id}`));
  return axios.all(requests).then(() => {});
};

export {
  getUsers,
  deleteUser,
  deleteSelectedUsers,
  getUserById,
  createUser,
  updateUser,
};
