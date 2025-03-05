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

/**
 * putChangeTargetCalendarStatus
 * @description 월간 캘린더 타겟 날짜 상태 변경
 * @param id
 * @param status
 */
const putChangeTargetCalendarStatus = async ({ id, status }: { id: string; status: number }) => {
  return axiosClient.put(`${API.MONTHLY_CALENDAR}/target/${id}/${status}`);
};

const monthlyCalendarRepository = {
  getCalendarByMonth,
  getCalendarByDay,
  putChangeTargetCalendarStatus,
};

export default monthlyCalendarRepository;
