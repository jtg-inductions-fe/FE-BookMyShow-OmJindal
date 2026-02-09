import { useEffect } from 'react';

import { Outlet } from 'react-router';

import { Spinner } from '@/components';
import { Footer, Header } from '@/containers';
import { useRefreshMutation } from '@/services';

export const MainLayout = () => {
  const [refresh, { isLoading }] = useRefreshMutation();

  // Initial refresh call to set the authentication state
  useEffect(() => {
    const doRefresh = () => {
      void refresh().unwrap();
    };

    doRefresh();
  }, [refresh]);

  if (isLoading)
    return (
      <div className="h-screen w-screen flex items-center justify-center">
        <Spinner className="size-8" />
      </div>
    );

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
