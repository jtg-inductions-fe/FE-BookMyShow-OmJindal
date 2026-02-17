import { Outlet } from 'react-router';

import { Spinner } from '@/components';
import { Footer, Header } from '@/containers';
import { useRefreshQuery } from '@/services';

export const MainLayout = () => {
  const { isLoading } = useRefreshQuery();

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
