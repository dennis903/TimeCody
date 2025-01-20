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

/**
 * getCalendarByDay
 * @description 월간 캘린더 타겟 날짜 조회
 * @param date // YYYY-MM-DD
 */
const getCalendarByDay = async (date: string) => {
  return axiosClient.get(`${API.MONTHLY_CALENDAR}/target/${date}`);
};

const monthlyCalendarRepository = {
  getCalendarByMonth,
  getCalendarByDay,
};

export default monthlyCalendarRepository;
