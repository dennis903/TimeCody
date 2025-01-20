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

const sidebarRepository = {
  getSidebarCategory,
  putUpdateSidebarCategory,
  postAddSidebarCategory,
};

export default sidebarRepository;
