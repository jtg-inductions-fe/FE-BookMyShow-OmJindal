import { useState } from 'react';

import { Link } from 'react-router';

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  AvatarSkeleton,
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Profile,
  Separator,
} from '@/components';
import { ROUTES } from '@/constants';
import { useProfileQuery } from '@/services';
import { useAppSelector } from '@/store';

import type { AuthMenuProps } from './AuthMenu.types';

export const AuthUserMenu = ({ isLoggingOut, openModal }: AuthMenuProps) => {
  const [open, setOpen] = useState(false);
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  const { data: user, isLoading: isLoadingUser } = useProfileQuery(undefined, {
    skip: !isAuthenticated,
  });

  const isAuthRoute = location.pathname === ROUTES.SIGNIN || location.pathname === ROUTES.SIGNUP;

  // If user is not authenticated then show signin button
  if (!isAuthenticated) {
    // do not show signin button on auth routes
    if (isAuthRoute) return null;
    return (
      <Button to={ROUTES.SIGNIN} asLink>
        Sign In
      </Button>
    );
  }

  if (isLoadingUser) {
    return <AvatarSkeleton />;
  }

  if (!user) return null;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button size="icon" className="rounded-full">
          <Avatar>
            <AvatarImage src={user.profilePicture} alt="User avatar" />
            <AvatarFallback>{user.name[0].toUpperCase()}</AvatarFallback>
          </Avatar>
        </Button>
      </PopoverTrigger>
      <PopoverContent side="bottom" align="end" className="w-64 p-2">
        <Link to={ROUTES.PROFILE} onClick={() => setOpen(false)}>
          <Profile
            name={user.name}
            email={user.email}
            profilePicture={user.profilePicture}
            size="lg"
          />
        </Link>
        <Separator />
        <Button variant="destructive" onClick={openModal} disabled={isLoggingOut}>
          Log out
        </Button>
      </PopoverContent>
    </Popover>
  );
};
