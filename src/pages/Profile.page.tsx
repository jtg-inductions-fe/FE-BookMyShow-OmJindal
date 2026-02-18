import { Booking, ProfileContainer } from '@/containers';

const ProfilePage = () => (
  <div className="space-y-12 w-full p-8 sm:p-12 lg:p-16">
    <ProfileContainer />
    <Booking />
  </div>
);

export default ProfilePage;
