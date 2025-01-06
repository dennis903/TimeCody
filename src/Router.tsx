import { createBrowserRouter } from 'react-router-dom';

import MainPage from './view/pages/page';
import LoginPage from './view/pages/login/page';
import AccountLoginPage from './view/pages/account/login/page';
import CalendarPage from './view/pages/calendar/page';
import CalendarSchedulePage from './view/pages/calendar/schedule/page';
import CalendarWeeklyPage from './view/pages/calendar/Weekly/page';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainPage />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/account/login',
    element: <AccountLoginPage />,
  },
  {
    path: '/Calendar',
    element: <CalendarPage />,
  },
  {
    path: '/calendar/schedule',
    element: <CalendarSchedulePage />,
  },
  {
    path: '/calendar/weekly',
    element: <CalendarWeeklyPage />,
  },
]);
