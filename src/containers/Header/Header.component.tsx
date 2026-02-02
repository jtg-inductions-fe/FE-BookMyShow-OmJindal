import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components';

import type { AvatarDropdownProps } from './Header.types';

/**
 * AvatarDropdown renders the authenticated user's avatar
 * with a dropdown menu for profile and logout.
 */

export const AvatarDropdown = ({ handleClick, user }: AvatarDropdownProps) => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button size="icon" className="rounded-full">
        <Avatar>
          <AvatarImage src={user?.profilePicture as string} alt="shadcn" />
          <AvatarFallback>{user?.name.toUpperCase().at(0)}</AvatarFallback>
        </Avatar>
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent className="w-32">
      <DropdownMenuGroup>
        <DropdownMenuItem>Profile</DropdownMenuItem>
      </DropdownMenuGroup>
      <DropdownMenuSeparator />
      <DropdownMenuGroup>
        <DropdownMenuItem variant="destructive" onClick={handleClick}>
          Log out
        </DropdownMenuItem>
      </DropdownMenuGroup>
    </DropdownMenuContent>
  </DropdownMenu>
);
