import { LatestMovieCarousel, LatestMovieGrid } from '@/containers';

const HomePage = () => (
  <div className="space-y-10 w-full">
    <LatestMovieCarousel />
    <LatestMovieGrid />
  </div>
);

export default HomePage;
