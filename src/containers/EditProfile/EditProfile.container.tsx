import { type ChangeEvent, type FormEvent, useEffect, useState } from 'react';

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
  Typography,
} from '@/components';
import { REGEX, ROUTES, VALIDATION_PARAMETERS } from '@/constants';
import { useEditProfileMutation, useProfileQuery } from '@/services';
import type { ApiError, LocationState } from '@/types';

import { validateEditProfileForm, validateProfileImage } from './EditProfile.helper';
import { EditProfileSkeleton } from './EditProfile.skeleton';
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
  const [errors, setErrors] = useState<FormErrors>({
    name: [],
    phoneNumber: [],
    profilePicture: [],
  });
  // Preview state to show preview of user profilePicture
  const [preview, setPreview] = useState<string | undefined>(undefined);

  // UseEffect to set the user data inside the form
  useEffect(() => {
    if (!user) return;

    const setter = () => {
      setForm((prev) => ({
        ...prev,
        name: user.name ?? '',
        phoneNumber: user.phoneNumber ?? '',
      }));
      setPreview(user.profilePicture);
    };

    setter();
  }, [user]);

  // Revokes previously created object URLs to prevent memory leaks.
  useEffect(
    () => () => {
      if (preview?.startsWith('blob:')) {
        URL.revokeObjectURL(preview);
      }
    },
    [preview],
  );

  // Check if the new fields are same as current user fields.
  const isUnchanged =
    form.name.trim() === user?.name &&
    form.phoneNumber.trim() === user?.phoneNumber &&
    !form.profilePicture;

  // Handles form submission.
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Validate form fields.
    const validationError = validateEditProfileForm(form);

    const isError = Object.values(validationError).some((value) => value.length > 0);

    if (isError) {
      setErrors(validationError);
      return;
    }

    setErrors({
      name: [],
      phoneNumber: [],
      profilePicture: [],
    });

    // Trigger RTK Query editProfile mutation.
    editProfile({
      name: form.name.trim(),
      phone_number: form.phoneNumber,
      profile_picture: form.profilePicture,
    })
      .unwrap()
      .then(() => {
        // Navigate to the previous page on success OR to Profile Page.
        void navigate(to, { replace: true });
      })
      .catch((error: ApiError<QueryError>) => {
        if (!error || typeof error !== 'object' || !('data' in error)) return;

        const data = error.data;

        const err: FormErrors = {
          name: [],
          phoneNumber: [],
          profilePicture: [],
        };

        if (data.name?.length) {
          err.name = data.name;
        }
        if (data.phone_number?.length) {
          err.phoneNumber = data.phone_number;
        }
        if (data.profile_picture?.length) {
          err.profilePicture = data.profile_picture;
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

      if (error.length) {
        setErrors((prev) => ({ ...prev, profilePicture: error }));
        return;
      }

      // Clear error if image validation passes
      setErrors((prev) => ({ ...prev, profilePicture: [] }));

      setForm((prev) => ({ ...prev, [name]: file }));

      // Create object URL and set the Profile Image Preview
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);
      return;
    }

    // Add only valid values to phoneNumber form field
    if (name === 'phoneNumber') {
      const number = value.slice(0, VALIDATION_PARAMETERS.PHONE.MAX_LENGTH);
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
    return <EditProfileSkeleton />;
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
                <FieldLabel
                  htmlFor="profilePicture"
                  tabIndex={0}
                  className="group flex flex-col items-center cursor-pointer"
                  onKeyDown={(e) => {
                    if (e.code === 'Enter' || e.code === 'Space') {
                      e.preventDefault();
                      document.getElementById('profilePicture')?.click();
                    }
                  }}
                >
                  <div
                    className="h-25 w-25 bg-secondary/10 rounded-full flex items-center justify-center
                    group-focus-visible:ring-2 group-focus-visible:ring-black
                    group-focus-visible:ring-offset-2"
                  >
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

                  <Typography tag="span">Upload Image</Typography>
                </FieldLabel>

                {errors.profilePicture.length ? (
                  errors.profilePicture.map((profilePictureError) => (
                    <FieldError key={profilePictureError} className="text-center">
                      {profilePictureError}
                    </FieldError>
                  ))
                ) : (
                  <FieldError>
                    <span aria-hidden="true"> </span>
                  </FieldError>
                )}

                <Input
                  id="profilePicture"
                  name="profilePicture"
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  onChange={handleChange}
                  disabled={isLoading}
                  aria-invalid={Boolean(errors.profilePicture.length)}
                  aria-label="Upload profile picture"
                  className="sr-only"
                  tabIndex={-1}
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
                  aria-invalid={Boolean(errors.name.length)}
                />
                {errors.name.length ? (
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
                  aria-invalid={Boolean(errors.phoneNumber.length)}
                />
                {errors.phoneNumber.length ? (
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
              <Button type="submit" size="md" disabled={isLoading || isUnchanged}>
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
