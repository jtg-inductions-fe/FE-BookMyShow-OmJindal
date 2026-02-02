import { Button } from '@/components';
import { ROUTES } from '@/constants';

export const SignIn = () => (
  <Button asLink to={ROUTES.SIGNUP}>
    SignUp
  </Button>
);
