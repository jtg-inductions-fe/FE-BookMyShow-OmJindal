import { Menu } from 'lucide-react';
import { VisuallyHidden } from 'radix-ui';
import type { ReactNode } from 'react';
import { Link, useLocation } from 'react-router';

import {
  Button,
  Profile,
  ProfileSkeleton,
  Separator,
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetTitle,
  SheetTrigger,
  Typography,
} from '@/components';
import { ROUTES } from '@/constants';
import { useProfileQuery } from '@/services';
import { useAppSelector } from '@/store';

import type { SidebarProps } from './Sidebar.types';

export const Sidebar = ({ openModal, isLoggingOut }: SidebarProps) => {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const location = useLocation();

  const { data: user, isLoading: isLoadingUser } = useProfileQuery(undefined, {
    skip: !isAuthenticated,
  });

  let profileSection: ReactNode = null;

  if (isAuthenticated) {
    if (isLoadingUser) {
      profileSection = <ProfileSkeleton />;
    } else if (user) {
      profileSection = (
        <>
          <Link to={ROUTES.PROFILE}>
            <Profile
              name={user.name}
              email={user.email}
              profilePicture={user.profilePicture}
              size="lg"
            />
          </Link>
          <Separator />
        </>
      );
    }
  }

  return (
    <Sheet>
      {/* Sidebar trigger element */}
      <SheetTrigger asChild className="sm:hidden">
        <button type="button" aria-label="Toggle Sidebar">
          <Menu color="white" className="bg-purple p-1 rounded-md" size={40} />
        </button>
      </SheetTrigger>
      {/* The content of the sidebar */}
      <SheetContent>
        <VisuallyHidden.Root>
          <SheetTitle>Navigation menu</SheetTitle>
          <SheetDescription>Browse movies, cinemas, and account options</SheetDescription>
        </VisuallyHidden.Root>
        {/* Profile section */}
        {profileSection}
        {/* Navigation Links */}
        <Typography>Browse</Typography>
        <nav className="w-full flex flex-col gap-4">
          <Button
            variant={location.pathname === ROUTES.MOVIES ? 'primary' : 'secondary'}
            to={ROUTES.MOVIES}
            asLink
          >
            Movies
          </Button>
          <Button
            variant={location.pathname === ROUTES.CINEMAS ? 'primary' : 'secondary'}
            to={ROUTES.CINEMAS}
            asLink
          >
            Cinemas
          </Button>
        </nav>
        {/* Signin */}
        <SheetFooter>
          {isAuthenticated ? (
            <Button variant="destructive" onClick={openModal} disabled={isLoggingOut}>
              Log out
            </Button>
          ) : (
            <Button to={ROUTES.SIGNIN} asLink>
              Sign In
            </Button>
          )}
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
