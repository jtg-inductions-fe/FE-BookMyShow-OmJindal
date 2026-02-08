import { useEffect } from 'react';

import { Outlet } from 'react-router';

import { Footer, Header } from '@/containers';
import { useRefreshMutation } from '@/services';

export const MainLayout = () => {
  const [refresh, {}] = useRefreshMutation();

  // Initial refresh call to set the authentication state
  useEffect(() => {
    const doRefresh = async () => {
      try {
        await refresh().unwrap();
      } catch {}
    };

    void doRefresh();
  }, [refresh]);

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="mx-auto flex w-full max-w-480 grow bg-grey-bg">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
