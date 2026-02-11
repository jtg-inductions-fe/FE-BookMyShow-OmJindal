import NOTFOUND_IMAGE from '@/assets/images/404_not_found.webp';
import { ErrorComponent } from '@/components';
import { ROUTES } from '@/constants';

const NotFoundPage = () => (
  <ErrorComponent
    imgUrl={NOTFOUND_IMAGE}
    imgAltText="Not found"
    heading="Page not found"
    description="Oops! Looks like you followed a bad link. If you think this is a problem with us, please tell us."
    buttonText="Go Home"
    to={ROUTES.HOME}
  />
);

export default NotFoundPage;
