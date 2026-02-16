import { type ChangeEvent, type FormEvent, useState } from 'react';

import { Eye, EyeOffIcon } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router';

import {
  Button,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  NavigationLink,
  Typography,
} from '@/components';
import { ROUTES } from '@/constants';
import { useSigninMutation } from '@/services';
import type { ApiError, LocationState } from '@/types';

import { validateSignInForm } from './SignIn.helper';
import type { FormErrors, QueryError, SignInForm } from './SignIn.types';

export const SignIn = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as LocationState;
  // The path to be navigated to after successfull signin
  const to = state?.from || ROUTES.HOME;

  const [signin, { isLoading }] = useSigninMutation();

  // Form states for sign-in inputs.
  const [form, setForm] = useState<SignInForm>({
    email: '',
    password: '',
  });
  // Validation and API error state for the form.
  const [errors, setErrors] = useState<FormErrors>({});
  //  State to manage password visibility toggle.
  const [showPassword, setShowPassword] = useState(false);

  // Handles form submission.
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Validate form fields.
    const validationError = validateSignInForm(form);

    if (Object.keys(validationError).length > 0) {
      setErrors(validationError);
      return;
    }

    // Trigger RTK Query signin mutation.
    signin({
      email: form.email,
      password: form.password,
    })
      .unwrap()
      .then(() => {
        // Navigate to the previous page on success OR to Home Page.
        void navigate(to, { replace: true });
      })
      .catch((error: ApiError<QueryError>) => {
        if (!error || typeof error !== 'object' || !('data' in error)) return;
        // Set API errors in local form error state.
        setErrors({
          detail: error.data.detail,
        });
      });
  };

  // Handles input field changes and updates form state.
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  return (
    <Card>
      <CardHeader>
        <div className="rounded-full h-15 max-w-15">
          <img
            src="/moviebook.svg"
            alt=""
            aria-hidden="true"
            className="w-full h-full object-contain"
          />
        </div>
        <Typography tag="h1" variant="h2">
          Welcome Back
        </Typography>
        <Typography tag="p" color="secondary">
          Sign in to book your tickets
        </Typography>
      </CardHeader>
      <CardContent>
        <form className="flex flex-col gap-4" noValidate onSubmit={handleSubmit}>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                id="email"
                name="email"
                placeholder="Enter your email"
                onChange={handleChange}
                value={form.email}
                type="email"
                disabled={isLoading}
                autoComplete="email"
                aria-invalid={Boolean(errors.detail) || Boolean(errors.email)}
              />
              <FieldError>{errors.email || <span aria-hidden="true"></span>}</FieldError>
            </Field>

            <Field>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <InputGroup>
                <InputGroupInput
                  id="password"
                  name="password"
                  placeholder="Enter your password"
                  onChange={handleChange}
                  value={form.password}
                  type={showPassword ? 'text' : 'password'}
                  disabled={isLoading}
                  autoComplete="current-password"
                  aria-invalid={Boolean(errors.detail) || Boolean(errors.password)}
                />
                <InputGroupAddon align="inline-end">
                  <InputGroupButton
                    aria-label="Toggle password visibility"
                    size="icon-xs"
                    onClick={() => setShowPassword((prev) => !prev)}
                  >
                    {showPassword ? <Eye /> : <EyeOffIcon />}
                  </InputGroupButton>
                </InputGroupAddon>
              </InputGroup>
              <FieldError>
                {errors.password || errors.detail ? (
                  errors.password || errors.detail
                ) : (
                  <span aria-hidden="true"> </span>
                )}
              </FieldError>
            </Field>
          </FieldGroup>

          <Button type="submit" size="sm" disabled={isLoading}>
            Sign In
          </Button>
        </form>
      </CardContent>
      <CardFooter>
        <Typography tag="p" variant="h6">
          Don&apos;t have an account?
        </Typography>
        <NavigationLink to={ROUTES.SIGNUP}>Sign Up</NavigationLink>
      </CardFooter>
    </Card>
  );
};
