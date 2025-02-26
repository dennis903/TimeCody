import { http, HttpResponse } from 'msw';
import { dateDB } from './db/dateDB';
import { categoryDB } from './db/categoryDB';
import { sharedCategoryDB } from './db/sharedCalendarCategoryDB';
import { monthlyCategoryDB } from './db/monthlyCategoryDB';
import { format } from 'date-fns';

export const handlers = [
  http.get(`${import.meta.env.VITE_API_URL}/monthlyCalendar/:date`, ({ params }) => {
    // 2024-08-11
    const { date } = params;

    if (!dateDB[date as keyof typeof dateDB]) {
      return HttpResponse.json({ message: 'Not Found' }, { status: 404 });
    }

    return HttpResponse.json(dateDB[date as keyof typeof dateDB], { status: 200 });
  }),

  http.get(
    `${import.meta.env.VITE_API_URL}/monthlyCalendar/target/:date`,
    ({ params }: { params: { date: string } }) => {
      const { date } = params;

      // date가 올바른 형식인지 확인
      if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
        return HttpResponse.json({ message: 'Invalid date format' }, { status: 400 });
      }

      // year-month 추출
      const [year, month] = date.split('-');
      const key = `${year}-${month}`;

      // 해당 month 데이터가 있는지 확인
      const targetMonth = dateDB[key];
      if (!targetMonth) {
        return HttpResponse.json({ message: 'Not Found' }, { status: 404 });
      }

      // 해당 날짜 데이터 필터링
      const foundDate = targetMonth.filter((item) => {
        const targetDate = new Date(date).getTime();

        // 정확히 해당 날짜가 start나 end에 일치하는 경우
        if (format(new Date(item.start), 'yyyy-MM-dd') === date) {
          return true;
        }

        // 구간 데이터 처리: start와 end가 존재하고 targetDate가 범위 내에 있는 경우
        if (item.start && item.end) {
          const startDate = new Date(item.start).getTime();
          const endDate = new Date(item.end).getTime();

          // 범위 비교 (start <= target <= end)
          if (targetDate >= startDate && targetDate <= endDate) {
            return true;
          }
        }

        return false;
      });

      if (foundDate.length === 0) {
        return HttpResponse.json({ message: 'Not Found' }, { status: 404 });
      }

      return HttpResponse.json(foundDate, { status: 200 });
    },
  ),

  http.post(`${import.meta.env.VITE_API_URL}/monthlyCalendar/target/:date/:status`, async ({ params, request }) => {
    const { date, status } = params as { date: string; status: string };

    const { type, title, start, end, color, groupId, backgroundColor } = (await request.json()) as {
      type: string;
      title: string;
      start: string;
      end?: string;
      color?: string;
      groupId?: string;
      backgroundColor?: string;
    };

    // date가 올바른 형식인지 확인
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      return HttpResponse.json({ message: 'Invalid date format' }, { status: 400 });
    }

    // year-month 추출
    const [year, month] = date.split('-');
    const key = `${year}-${month}`;

    // 해당 month 데이터가 있는지 확인
    if (!dateDB[key]) {
      return HttpResponse.json({ message: 'Not Found' }, { status: 404 });
    }

    // status가 0, 1, 2 중 하나인지 확인
    if (!['0', '1', '2'].includes(status)) {
      return HttpResponse.json({ message: 'Invalid status' }, { status: 400 });
    }

    // status를 number로 변환
    const statusNumber = Number(status) as 0 | 1 | 2;

    // 새로운 데이터 추가
    dateDB[key].push({
      type,
      title,
      start,
      end,
      color,
      groupId,
      backgroundColor,
      status: statusNumber,
    });

    return HttpResponse.json(dateDB[key], { status: 200 });
  }),

  http.get(`${import.meta.env.VITE_API_URL}/sidebar/category`, () => {
    return HttpResponse.json(categoryDB, { status: 200 });
  }),

  http.put(`${import.meta.env.VITE_API_URL}/sidebar/category`, async ({ request }) => {
    const newCategory = (await request.json()) as { id: number; value: string; color: string };

    const { id, value, color } = newCategory;

    categoryDB.forEach((category) => {
      if (category.id === id) {
        category.title = value;
        category.color = color;
      }
    });

    return HttpResponse.json(categoryDB, { status: 200 });
  }),

  http.post(`${import.meta.env.VITE_API_URL}/sidebar/category`, async ({ request }) => {
    const newCategory = (await request.json()) as { value: string; color: string };

    const { value, color } = newCategory;
    const id = categoryDB.length > 0 ? categoryDB[categoryDB.length - 1].id + 1 : 1;

    categoryDB.push({
      id,
      title: value,
      color,
    });

    return HttpResponse.json(categoryDB, { status: 200 });
  }),

  http.delete(`${import.meta.env.VITE_API_URL}/sidebar/category/:id`, ({ params }) => {
    const { id } = params;

    const index = categoryDB.findIndex((category) => category.id === Number(id));

    if (index === -1) {
      return HttpResponse.json({ message: 'Not Found' }, { status: 404 });
    }

    categoryDB.splice(index, 1);

    return HttpResponse.json(categoryDB, { status: 200 });
  }),

  http.get(`${import.meta.env.VITE_API_URL}/sidebar/monthly`, () => {
    return HttpResponse.json(monthlyCategoryDB, { status: 200 });
  }),

  http.put(`${import.meta.env.VITE_API_URL}/sidebar/monthly`, async ({ request }) => {
    const newCategory = (await request.json()) as { id: number; value: string; color: string };

    const { id, value, color } = newCategory;

    monthlyCategoryDB.forEach((monthlyCategory) => {
      if (monthlyCategory.id === id) {
        monthlyCategory.title = value;
        monthlyCategory.color = color;
      }
    });

    return HttpResponse.json(monthlyCategoryDB, { status: 200 });
  }),

  http.post(`${import.meta.env.VITE_API_URL}/sidebar/monthly`, async ({ request }) => {
    const newCategory = (await request.json()) as { value: string; color: string };

    const { value, color } = newCategory;
    const id = monthlyCategoryDB.length > 0 ? monthlyCategoryDB[monthlyCategoryDB.length - 1].id + 1 : 1;

    monthlyCategoryDB.push({
      id,
      title: value,
      color,
    });

    return HttpResponse.json(monthlyCategoryDB, { status: 200 });
  }),

  http.delete(`${import.meta.env.VITE_API_URL}/sidebar/monthly/:id`, ({ params }) => {
    const { id } = params;

    const index = monthlyCategoryDB.findIndex((monthlyCategory) => monthlyCategory.id === Number(id));

    if (index === -1) {
      return HttpResponse.json({ message: 'Not Found' }, { status: 404 });
    }

    monthlyCategoryDB.splice(index, 1);

    return HttpResponse.json(monthlyCategoryDB, { status: 200 });
  }),

  http.get(`${import.meta.env.VITE_API_URL}/sidebar/shared`, () => {
    return HttpResponse.json(sharedCategoryDB, { status: 200 });
  }),

  http.put(`${import.meta.env.VITE_API_URL}/sidebar/shared`, async ({ request }) => {
    const newCategory = (await request.json()) as { id: number; value: string; color: string };

    const { id, value, color } = newCategory;

    sharedCategoryDB.forEach((sharedCategory) => {
      if (sharedCategory.id === id) {
        sharedCategory.title = value;
        sharedCategory.color = color;
      }
    });

    return HttpResponse.json(sharedCategoryDB, { status: 200 });
  }),

  http.post(`${import.meta.env.VITE_API_URL}/sidebar/shared`, async ({ request }) => {
    const newCategory = (await request.json()) as { value: string; color: string };

    const { value, color } = newCategory;
    const id = sharedCategoryDB.length > 0 ? sharedCategoryDB[sharedCategoryDB.length - 1].id + 1 : 1;

    sharedCategoryDB.push({
      id,
      title: value,
      color,
    });

    return HttpResponse.json(sharedCategoryDB, { status: 200 });
  }),

  http.delete(`${import.meta.env.VITE_API_URL}/sidebar/shared/:id`, ({ params }) => {
    const { id } = params;

    const index = sharedCategoryDB.findIndex((sharedCategory) => sharedCategory.id === Number(id));

    if (index === -1) {
      return HttpResponse.json({ message: 'Not Found' }, { status: 404 });
    }

    sharedCategoryDB.splice(index, 1);

    return HttpResponse.json(sharedCategoryDB, { status: 200 });
  }),
];
