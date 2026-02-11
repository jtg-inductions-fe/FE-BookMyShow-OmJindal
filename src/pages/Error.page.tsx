import ERROR_IMAGE from '@/assets/images/500_error.webp';
import { ErrorComponent } from '@/components';
import { ROUTES } from '@/constants';

const ErrorPage = () => (
  <div className="w-screen h-screen flex items-center justify-center">
    <ErrorComponent
      imgUrl={ERROR_IMAGE}
      imgAltText="Error found"
      heading="Something went wrong"
      description="We're experiencing technical difficulties. Please try again or come back later."
      buttonText="Go Home"
      to={ROUTES.HOME}
    />
  </div>
);

export default ErrorPage;
