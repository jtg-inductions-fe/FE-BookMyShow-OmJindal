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
  const to = state?.from || ROUTES.HOME;

  const [signin, { isLoading }] = useSigninMutation();

  const [form, setForm] = useState<SignInForm>({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const validationError = validateSignInForm(form);

    if (Object.keys(validationError).length > 0) {
      setErrors(validationError);
      return;
    }

    signin({
      email: form.email,
      password: form.password,
    })
      .unwrap()
      .then(() => {
        void navigate(to, { replace: true });
      })
      .catch((error: ApiError<QueryError>) => {
        if (!error || typeof error !== 'object' || !('data' in error)) return;

        setErrors({
          detail: error.data.detail,
        });
      });
  };

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
                <InputGroupAddon
                  align="inline-end"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="cursor-pointer"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <Eye /> : <EyeOffIcon />}
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
        <NavigationLink to={ROUTES.SIGNUP} color="pink">
          Sign Up
        </NavigationLink>
      </CardFooter>
    </Card>
  );
};
