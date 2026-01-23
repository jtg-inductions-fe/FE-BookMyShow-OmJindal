import { ErrorComponent } from '@/components';
import { ERROR_IMAGE, ROUTES } from '@/constants';

export const ErrorPage = () => (
  <ErrorComponent
    imgUrl={ERROR_IMAGE}
    imgAltText="Error found"
    heading="Something went wrong"
    description="We're experiencing technical difficulties. Please try again or come back later."
    buttonText="Go Home"
    to={ROUTES.HOME}
  />
);
