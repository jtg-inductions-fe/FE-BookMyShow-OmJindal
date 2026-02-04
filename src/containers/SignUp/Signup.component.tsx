import { Eye, EyeOffIcon } from 'lucide-react';

import {
  Button,
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/components';

import type { SignUpFormProps } from './SignUp.types';

export const SignUpForm = ({
  handleChange,
  handleSubmit,
  errors,
  formData,
  isLoading,
  showPassword,
  setShowPassword,
  showConfirmPassword,
  setShowConfirmPassword,
}: SignUpFormProps) => (
  <form
    className="flex flex-col gap-4"
    noValidate
    onSubmit={(e) => {
      void handleSubmit(e);
    }}
  >
    <FieldGroup>
      <Field>
        <FieldLabel htmlFor="name">Full name</FieldLabel>
        <Input
          id="name"
          name="name"
          placeholder="Enter your name"
          onChange={handleChange}
          value={formData.name}
          disabled={isLoading}
          autoComplete="name"
          aria-invalid={Boolean(errors.name)}
        />
        <FieldError>{errors.name ?? <span aria-hidden="true">&nbsp;</span>}</FieldError>
      </Field>

      <Field>
        <FieldLabel htmlFor="email">Email</FieldLabel>
        <Input
          id="email"
          name="email"
          placeholder="Enter your email"
          onChange={handleChange}
          value={formData.email}
          type="email"
          disabled={isLoading}
          autoComplete="email"
          aria-invalid={Boolean(errors.email)}
        />
        <FieldError>{errors.email ?? <span aria-hidden="true">&nbsp;</span>}</FieldError>
      </Field>

      <Field>
        <FieldLabel htmlFor="password">Password</FieldLabel>
        <InputGroup>
          <InputGroupInput
            id="password"
            name="password"
            placeholder="Create your password"
            onChange={handleChange}
            value={formData.password}
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
        <FieldError>{errors.password ?? <span aria-hidden="true">&nbsp;</span>}</FieldError>
      </Field>

      <Field>
        <FieldLabel htmlFor="confirmPassword">Confirm Password</FieldLabel>
        <InputGroup>
          <InputGroupInput
            id="confirmPassword"
            name="confirmPassword"
            placeholder="Re-enter your password"
            onChange={handleChange}
            value={formData.confirmPassword}
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
          {errors.confirmPassword ?? errors.detail ?? <span aria-hidden="true">&nbsp;</span>}
        </FieldError>
      </Field>
    </FieldGroup>

    <Button type="submit" size="sm" disabled={isLoading}>
      Sign Up
    </Button>
  </form>
);
