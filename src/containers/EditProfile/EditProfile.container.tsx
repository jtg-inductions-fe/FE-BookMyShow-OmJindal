import { type ChangeEvent, type FormEvent, useState } from 'react';

import { User as UserIcon } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router';

import {
  Button,
  Card,
  CardContent,
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  Input,
  Spinner,
  Typography,
} from '@/components';
import { REGEX, ROUTES } from '@/constants';
import { useEditProfileMutation, useProfileQuery } from '@/services';
import type { ApiError, LocationState } from '@/types';

import { validateEditProfileForm, validateProfileImage } from './EditProfile.helper';
import type { EditProfileForm, FormErrors, QueryError } from './EditProfile.types';

export const EditProfile = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as LocationState;
  // The path to be navigated to after successfull profile updation
  const to = state?.from || ROUTES.PROFILE;

  const [editProfile, { isLoading }] = useEditProfileMutation();
  const { data: user, isLoading: isLoadingProfile } = useProfileQuery();

  // Form states for edit-profile inputs.
  const [form, setForm] = useState<EditProfileForm>({
    name: '',
    phoneNumber: '',
    profilePicture: undefined,
  });
  // Validation and API error state for the form.
  const [errors, setErrors] = useState<FormErrors>({});
  // Preview state to show preview of user profilePicture
  const [preview, setPreview] = useState<string | null>(null);

  // Handles form submission.
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Validate form fields.
    const validationError = validateEditProfileForm(form);
    if (Object.keys(validationError).length > 0) {
      setErrors(validationError);
      return;
    }
    setErrors({});

    // Check if the new fields are same as current user fields.
    const isUnchanged =
      (form.name?.trim() === '' || form.name === user?.name) &&
      (form.phoneNumber?.trim() === '' || form.phoneNumber === user?.phoneNumber) &&
      !form.profilePicture;
    // If fields are same then do not place API call
    if (isUnchanged) {
      void navigate(to, { replace: true });
      return;
    }

    // Trigger RTK Query editProfile mutation.
    editProfile({
      name: form.name.trim() || undefined,
      phone_number: form.phoneNumber || undefined,
      profile_picture: form.profilePicture,
    })
      .unwrap()
      .then(() => {
        // Navigate to the previous page on success OR to Profile Page.
        void navigate(to, { replace: true });
      })
      .catch((error: ApiError<QueryError>) => {
        const data = error.data;
        const err: FormErrors = {};

        if (data.phone_number?.length) {
          err.phoneNumber = data.phone_number;
        }
        if (data.profile_picture?.length) {
          err.profilePicture = data.profile_picture;
        }
        if (data.name?.length) {
          err.name = data.name;
        }
        // Set API errors in local form error state.
        setErrors(err);
      });
  };

  /**
   * Handles input field changes and updates form state
   * along with updation and validation
   */
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value, files, type } = event.target;

    if (type === 'file') {
      const file = files?.[0];
      if (!file) return;

      // Validates Profile Image
      const error = validateProfileImage(file);

      if (error) {
        setErrors((prev) => ({ ...prev, profilePicture: error }));
        return;
      }

      // Clear error if image validation passes
      setErrors((prev) => ({ ...prev, profilePicture: undefined }));

      setForm((prev) => ({ ...prev, [name]: file }));

      // Create object URL and set the Profile Image Preview
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);
      return;
    }

    // Add only valid values to phoneNumber form field
    if (name === 'phoneNumber') {
      const number = value.slice(0, 10);
      // Ignores all character other than number
      if (!REGEX.PHONE.test(number)) {
        return;
      }
      setForm((prev) => ({
        ...prev,
        phoneNumber: number,
      }));
      return;
    }

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleClick = () => void navigate(to);

  if (isLoadingProfile) {
    return <Spinner />;
  }

  return (
    <div>
      <Typography variant="h2" tag="h1">
        Edit Profile
      </Typography>
      <Card>
        <CardContent>
          <form className="space-y-4" noValidate onSubmit={handleSubmit}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="profilePicture" className="flex flex-col">
                  <div className="h-25 w-25 bg-secondary/10 rounded-full flex items-center justify-center mx-auto cursor-pointer">
                    {preview ? (
                      <img
                        src={preview}
                        alt="Profile preview"
                        className="h-full w-full object-cover rounded-full"
                      />
                    ) : (
                      <UserIcon size="30" />
                    )}
                  </div>
                  <Typography>Upload Image</Typography>
                  {errors.profilePicture && errors.profilePicture.length > 0 ? (
                    errors.profilePicture.map((profilePictureError) => (
                      <FieldError key={profilePictureError}>{profilePictureError}</FieldError>
                    ))
                  ) : (
                    <FieldError>
                      <span aria-hidden="true"> </span>
                    </FieldError>
                  )}
                </FieldLabel>
                <Input
                  id="profilePicture"
                  name="profilePicture"
                  type="file"
                  accept="image/*"
                  onChange={handleChange}
                  disabled={isLoading}
                  aria-invalid={Boolean(errors.profilePicture)}
                  aria-label="Upload profile picture"
                  className="hidden"
                />
              </Field>
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
                {errors.name && errors.name.length > 0 ? (
                  errors.name.map((nameError) => (
                    <FieldError key={nameError}>{nameError}</FieldError>
                  ))
                ) : (
                  <FieldError>
                    <span aria-hidden="true"> </span>
                  </FieldError>
                )}
              </Field>
              <Field>
                <FieldLabel htmlFor="phoneNumber">Phone Number</FieldLabel>
                <Input
                  id="phoneNumber"
                  name="phoneNumber"
                  placeholder="Enter your phone number"
                  onChange={handleChange}
                  value={form.phoneNumber}
                  type="tel"
                  disabled={isLoading}
                  autoComplete="tel"
                  aria-invalid={Boolean(errors.phoneNumber)}
                />
                {errors.phoneNumber && errors.phoneNumber.length > 0 ? (
                  errors.phoneNumber.map((phoneNumberError) => (
                    <FieldError key={phoneNumberError}>{phoneNumberError}</FieldError>
                  ))
                ) : (
                  <FieldError>
                    <span aria-hidden="true"> </span>
                  </FieldError>
                )}
              </Field>
            </FieldGroup>
            <div className="flex flex-col justify-center sm:flex-row gap-5 *:w-full sm:*:w-1/2">
              <Button type="submit" size="md" disabled={isLoading}>
                Save Changes
              </Button>
              <Button
                type="button"
                variant="secondary"
                size="md"
                disabled={isLoading}
                onClick={handleClick}
              >
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
