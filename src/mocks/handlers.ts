import { http, HttpResponse } from 'msw';
import { dateDB } from './db/dateDB';

export const handlers = [
  http.get(`${import.meta.env.VITE_API_URL}/monthlyCalendar/:date`, ({ params }) => {
    const { date } = params;

    if (!dateDB[date as keyof typeof dateDB]) {
      return HttpResponse.json({ message: 'Not Found' }, { status: 404 });
    }

    return HttpResponse.json(dateDB[date as keyof typeof dateDB], { status: 200 });
  }),
];
