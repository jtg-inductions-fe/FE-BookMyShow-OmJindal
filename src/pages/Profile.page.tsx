import { Booking, Profile } from '@/containers';

const ProfilePage = () => (
  <div className="space-y-12 w-full p-8 sm:p-12 lg:p-16">
    <Profile />
    <Booking />
  </div>
);

export default ProfilePage;
