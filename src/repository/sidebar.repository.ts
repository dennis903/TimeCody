import { API } from './index';
import { axiosClient } from '@/utils/axios/axios.client';

const getSidebarCategory = async () => {
  return axiosClient.get(`${API.SIDEBAR}/category`);
};

const putUpdateSidebarCategory = async ({ id, value, color }: { id: number; value: string; color: string }) => {
  return axiosClient.put(`${API.SIDEBAR}/category`, {
    id,
    value,
    color,
  });
};

const postAddSidebarCategory = async ({ value, color }: { value: string; color: string }) => {
  return axiosClient.post(`${API.SIDEBAR}/category`, {
    value,
    color,
  });
};

const deleteSidebarCategory = async ({ id }: { id: number }) => {
  return axiosClient.delete(`${API.SIDEBAR}/category/${id}`);
};

const getSidebarMonthly = async () => {
  return axiosClient.get(`${API.SIDEBAR}/monthly`);
};

const putUpdateSidebarMonthly = async ({ id, value, color }: { id: number; value: string; color: string }) => {
  return axiosClient.put(`${API.SIDEBAR}/monthly`, {
    id,
    value,
    color,
  });
};

const postAddSidebarMonthly = async ({ value, color }: { value: string; color: string }) => {
  return axiosClient.post(`${API.SIDEBAR}/monthly`, {
    value,
    color,
  });
};

const deleteSidebarMonthly = async ({ id }: { id: number }) => {
  return axiosClient.delete(`${API.SIDEBAR}/monthly/${id}`);
};

const getSidebarShared = async () => {
  return axiosClient.get(`${API.SIDEBAR}/shared`);
};

const putUpdateSidebarShared = async ({ id, value, color }: { id: number; value: string; color: string }) => {
  return axiosClient.put(`${API.SIDEBAR}/shared`, {
    id,
    value,
    color,
  });
};

const postAddSidebarShared = async ({ value, color }: { value: string; color: string }) => {
  return axiosClient.post(`${API.SIDEBAR}/shared`, {
    value,
    color,
  });
};

const deleteSidebarShared = async ({ id }: { id: number }) => {
  return axiosClient.delete(`${API.SIDEBAR}/shared/${id}`);
};

const sidebarRepository = {
  getSidebarCategory,
  putUpdateSidebarCategory,
  postAddSidebarCategory,
  deleteSidebarCategory,
  getSidebarMonthly,
  putUpdateSidebarMonthly,
  postAddSidebarMonthly,
  deleteSidebarMonthly,
  getSidebarShared,
  putUpdateSidebarShared,
  postAddSidebarShared,
  deleteSidebarShared,
};

export default sidebarRepository;
