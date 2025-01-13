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

const sidebarRepository = {
  getSidebarCategory,
  putUpdateSidebarCategory,
};

export default sidebarRepository;
