import { API } from './index';
import { axiosClient } from '@/utils/axios/axios.client';

const getSidebarCategory = async () => {
  return axiosClient.get(`${API.SIDEBAR}/category`);
};

const SidebarRepository = {
  getSidebarCategory,
};

export default SidebarRepository;
