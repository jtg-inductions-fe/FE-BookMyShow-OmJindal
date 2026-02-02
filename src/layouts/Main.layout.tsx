import { Outlet } from 'react-router';

import { Footer, Header } from '@/containers';

export const MainLayout = () => (
  <div className="flex min-h-screen flex-col">
    <Header />
    <main className="mx-auto flex w-full max-w-480 grow bg-grey-bg">
      <Outlet />
    </main>
    <Footer />
  </div>
);
