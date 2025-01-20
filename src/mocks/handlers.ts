import { http, HttpResponse } from 'msw';
import { dateDB } from './db/dateDB';
import { categoryDB } from './db/categoryDB';

export const handlers = [
  http.get(`${import.meta.env.VITE_API_URL}/monthlyCalendar/:date`, ({ params }) => {
    // 2024-08-11
    const { date } = params;

    if (!dateDB[date as keyof typeof dateDB]) {
      return HttpResponse.json({ message: 'Not Found' }, { status: 404 });
    }

    return HttpResponse.json(dateDB[date as keyof typeof dateDB], { status: 200 });
  }),

  http.get(`${import.meta.env.VITE_API_URL}/monthlyCalendar/target/:date`, ({ params }) => {
    const { date } = params;

    if (!dateDB[date as keyof typeof dateDB]) {
      return HttpResponse.json({ message: 'Not Found' }, { status: 404 });
    }

    const targetDate = dateDB[date as keyof typeof dateDB];

    const foundDate = targetDate.find((d) => {
      if (d?.start === date || d?.end === date) {
        return d;
      }
    });

    if (!foundDate) {
      return HttpResponse.json({ message: 'Not Found' }, { status: 404 });
    }

    return HttpResponse.json(foundDate, { status: 200 });
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
];
