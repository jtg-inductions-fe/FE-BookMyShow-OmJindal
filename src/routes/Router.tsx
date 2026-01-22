import { createBrowserRouter } from 'react-router';

import { MainLayout } from '@/layouts';
import { Home, NotFound } from '@/pages';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: '*', element: <NotFound /> },
    ],
  },
]);
