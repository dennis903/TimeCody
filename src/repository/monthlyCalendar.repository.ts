import { API } from './index';
import { axiosClient } from '@/utils/axios/axios.client';

/**
 * getCalendarByMonth
 * @description 월간 캘린더 조회
 * @param date // YYYY-MM
 */
const getCalendarByMonth = async (date: string) => {
  return axiosClient.get(`${API.MONTHLY_CALENDAR}/${date}`);
};

const monthlyCalendarRepository = {
  getCalendarByMonth,
};

export default monthlyCalendarRepository;
