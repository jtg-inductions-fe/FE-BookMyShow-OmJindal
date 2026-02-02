import { useState } from 'react';

import { useNavigate } from 'react-router';

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  NavigationLink,
  Typography,
} from '@/components';
import { ROUTES } from '@/constants';
import { setAuthenticated } from '@/features';
import { useSignupMutation } from '@/services';
import { useAppDispatch } from '@/store';
import { validateEmail, validateName, validatePassword } from '@/utils';

import { SignUpForm } from './Signup.component';
import type { FormErrors, QueryError, SignupForm } from './SignUp.types';

export const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
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

  const validateSignUpForm = (data: SignupForm): FormErrors => {
    const err: FormErrors = {};

    const nameError = validateName(data.name);
    const emailError = validateEmail(data.email);
    const passwordError = validatePassword(data.password);

    if (nameError) err.name = nameError;
    if (emailError) err.email = emailError;
    if (passwordError) err.password = passwordError;

    if (!data.confirmPassword) {
      err.confirmPassword = 'Password is required';
    } else if (data.confirmPassword !== data.password) {
      err.confirmPassword = 'Passwords do not match';
    }

    return err;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const validationError = validateSignUpForm(form);
    setErrors(validationError);

    if (Object.keys(validationError).length > 0) return;

    try {
      const response = await signup({
        name: form.name,
        email: form.email,
        password: form.password,
        confirm_password: form.confirmPassword,
      }).unwrap();

      const { access, refresh } = response;

      localStorage.setItem('refreshToken', refresh);

      dispatch(setAuthenticated(access));

      void navigate(ROUTES.HOME);
    } catch (error) {
      if (!error || typeof error !== 'object' || !('data' in error)) return;

      const data = error.data as QueryError;

      const err: FormErrors = {};

      if (data?.email?.length) {
        err.email = data.email[0];
      }

      if (data?.password?.length) {
        err.password = data.password[0];
        err.confirmPassword = data.password[0];
      }

      setErrors(err);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  return (
    <Card>
      <CardHeader>
        <div className="rounded-full h-15 max-w-15">
          <img src="/moviebook.svg" alt="" aria-hidden="true" className="w-full h-full" />
        </div>
        <Typography as="h1" variant="h2">
          Create Account
        </Typography>
        <Typography className="text-secondary">Join us to book your favorite movies</Typography>
      </CardHeader>
      <CardContent>
        <SignUpForm
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          errors={errors}
          form={form}
          isLoading={isLoading}
          showPassword={showPassword}
          setShowPassword={setShowPassword}
          showConfirmPassword={showConfirmPassword}
          setShowConfirmPassword={setShowConfirmPassword}
        />
      </CardContent>
      <CardFooter>
        <Typography variant="h6" as="p">
          Already have an account?
        </Typography>
        <NavigationLink to={ROUTES.SIGNIN}>Sign In</NavigationLink>
      </CardFooter>
    </Card>
  );
};
