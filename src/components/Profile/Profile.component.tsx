import type { ProfileProps } from './Profile.types';
import { Avatar, AvatarFallback, AvatarImage } from '../Avatar';
import { Button } from '../Button';
import { Separator } from '../Separator';
import { Typography } from '../Typography';

/**
 * The user profile component showing avatar and basic details
 * along with profile and logout buttons.
 */
export const Profile = ({ user, isActive, to, handleClick }: ProfileProps) => (
  <>
    <div className="flex flex-row gap-4 items-center">
      <div>
        <Avatar className="h-15 w-15">
          <AvatarImage src={user.profilePicture} alt={`${user.name} avatar`} />
          <AvatarFallback>{user.name.trim()?.[0]?.toUpperCase()}</AvatarFallback>
        </Avatar>
      </div>
      <div>
        <Typography tag="p" variant="h4">
          {user.name}
        </Typography>
        <Typography tag="p" variant="small" color="secondary">
          {user.email}
        </Typography>
      </div>
    </div>
    <Separator />
    <div className="flex flex-col gap-2">
      <Button asLink to={to} variant={isActive ? 'purple' : 'secondary'}>
        Profile
      </Button>
      <Button variant="destructive" onClick={handleClick}>
        Log out
      </Button>
    </div>
  </>
);
