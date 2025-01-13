import { http, HttpResponse } from 'msw';
import { dateDB } from './db/dateDB';
import { categoryDB } from './db/categoryDB';

export const handlers = [
  http.get(`${import.meta.env.VITE_API_URL}/monthlyCalendar/:date`, ({ params }) => {
    const { date } = params;

    if (!dateDB[date as keyof typeof dateDB]) {
      return HttpResponse.json({ message: 'Not Found' }, { status: 404 });
    }

    return HttpResponse.json(dateDB[date as keyof typeof dateDB], { status: 200 });
  }),

  http.get(`${import.meta.env.VITE_API_URL}/sidebar/category`, () => {
    return HttpResponse.json(categoryDB, { status: 200 });
  }),

  http.put(`${import.meta.env.VITE_API_URL}/sidebar/category`, async ({ request }) => {
    const newCategory = (await request.json()) as { id: number; value: string; color: string };

    const { id, value, color } = newCategory;

    if (categoryDB.some((category) => category.title === value)) {
      return HttpResponse.json({ message: '이미 존재하는 카테고리 입니다.' }, { status: 409 });
    }

    categoryDB.forEach((category) => {
      if (category.id === id) {
        category.title = value;
        category.color = color;
      }
    });

    return HttpResponse.json(categoryDB, { status: 200 });
  }),
];
