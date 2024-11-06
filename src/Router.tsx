import { createBrowserRouter } from 'react-router-dom';

import MainPage from './view/pages/page';
import LoginPage from './view/pages/login/page';
import AccountLoginPage from './view/pages/account/login/page';

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
]);
