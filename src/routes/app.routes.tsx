import { createBrowserRouter } from 'react-router';

import { ROUTES } from '@/constants';
import { MainLayout } from '@/layouts';
import { HomePage, NotFoundPage } from '@/pages';

export const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    Component: MainLayout,
    children: [
      { index: true, Component: HomePage },
      { path: ROUTES.NOT_FOUND, Component: NotFoundPage },
    ],
  },
]);
