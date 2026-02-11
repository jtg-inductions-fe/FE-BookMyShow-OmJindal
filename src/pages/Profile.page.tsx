import { Booking, ProfileCard } from '@/containers';

const ProfilePage = () => (
  <div className="flex flex-col gap-12 w-full p-7 sm:p-12 lg:p-20">
    <ProfileCard />
    <Booking />
  </div>
);

export default ProfilePage;
