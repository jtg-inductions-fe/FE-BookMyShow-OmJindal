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
import { ERROR_MESSAGES, ROUTES } from '@/constants';
import { useSignupMutation } from '@/services';
import type { ApiError } from '@/types';

import { validateSignUpForm } from './Signup.helper';
import type { FormErrors, QueryError, SignupForm } from './SignUp.types';

export const SignUp = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as { from?: string };
  const to = state?.from || ROUTES.HOME;

  const [signup, { isLoading }] = useSignupMutation();

  const [form, setForm] = useState<SignupForm>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const validationError = validateSignUpForm(form);
    setErrors(validationError);
    if (Object.keys(validationError).length > 0) return;

    signup({
      name: form.name,
      email: form.email,
      password: form.password,
      confirm_password: form.confirmPassword,
    })
      .unwrap()
      .then(() => {
        void navigate(to);
      })
      .catch((error: ApiError<QueryError>) => {
        if (!error || typeof error !== 'object' || !('data' in error)) {
          setErrors({ detail: ERROR_MESSAGES.UNEXPECTED_ERROR });
          return;
        }
        const data = error.data;
        const err: FormErrors = {};

        if (data?.email?.length) {
          err.email = data.email[0];
        }
        if (data?.password?.length) {
          err.password = data.password[0];
        }
        if (data?.name?.length) {
          err.name = data.name[0];
        }

        setErrors(err);
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
          Create Account
        </Typography>
        <Typography color="secondary" tag="p">
          Join us to book your favorite movies
        </Typography>
      </CardHeader>
      <CardContent>
        <form className="flex flex-col gap-4" noValidate onSubmit={handleSubmit}>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="name">Full name</FieldLabel>
              <Input
                id="name"
                name="name"
                placeholder="Enter your name"
                onChange={handleChange}
                value={form.name}
                disabled={isLoading}
                autoComplete="name"
                aria-invalid={Boolean(errors.name)}
              />
              <FieldError>{errors.name ?? <span aria-hidden="true"> </span>}</FieldError>
            </Field>

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
                aria-invalid={Boolean(errors.email)}
              />
              <FieldError>{errors.email ?? <span aria-hidden="true"> </span>}</FieldError>
            </Field>

            <Field>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <InputGroup>
                <InputGroupInput
                  id="password"
                  name="password"
                  placeholder="Create your password"
                  onChange={handleChange}
                  value={form.password}
                  type={showPassword ? 'text' : 'password'}
                  disabled={isLoading}
                  autoComplete="new-password"
                  aria-invalid={Boolean(errors.password)}
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
              <FieldError>{errors.password ?? <span aria-hidden="true"> </span>}</FieldError>
            </Field>

            <Field>
              <FieldLabel htmlFor="confirmPassword">Confirm Password</FieldLabel>
              <InputGroup>
                <InputGroupInput
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="Re-enter your password"
                  onChange={handleChange}
                  value={form.confirmPassword}
                  type={showConfirmPassword ? 'text' : 'password'}
                  disabled={isLoading}
                  autoComplete="new-password"
                  aria-invalid={Boolean(errors.confirmPassword)}
                />
                <InputGroupAddon
                  align="inline-end"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                  className="cursor-pointer"
                  aria-label="Toggle confirm password visibility"
                >
                  {showConfirmPassword ? <Eye /> : <EyeOffIcon />}
                </InputGroupAddon>
              </InputGroup>
              <FieldError>
                {errors.confirmPassword || errors.detail ? (
                  errors.confirmPassword || errors.detail
                ) : (
                  <span aria-hidden="true"> </span>
                )}
              </FieldError>
            </Field>
          </FieldGroup>

          <Button type="submit" size="sm" disabled={isLoading}>
            Sign Up
          </Button>
        </form>
      </CardContent>
      <CardFooter>
        <Typography tag="p" variant="h6">
          Already have an account?
        </Typography>
        <NavigationLink to={ROUTES.SIGNIN}>Sign In</NavigationLink>
      </CardFooter>
    </Card>
  );
};
