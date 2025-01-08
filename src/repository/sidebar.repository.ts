import { API } from './index';
import { axiosClient } from '@/utils/axios/axios.client';

const getSidebarCategory = async () => {
  return axiosClient.get(`${API.SIDEBAR}/category`);
};

const sidebarRepository = {
  getSidebarCategory,
};

export default sidebarRepository;
