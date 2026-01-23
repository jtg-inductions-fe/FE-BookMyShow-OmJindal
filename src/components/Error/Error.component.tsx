import { Link } from 'react-router';

import { Button, Typography } from '@/components';

import type { ErrorComponentProps } from './Error.types';

export const ErrorComponent = ({
  imgUrl,
  imgAltText,
  heading,
  description,
  buttonText,
  to,
}: ErrorComponentProps) => (
  <div className="mx-auto flex flex-col items-center justify-center gap-6 px-5">
    <link rel="preload" as="image" href={imgUrl} fetchPriority="high" />

    <div className="h-60 w-82 lg:h-105 lg:w-140">
      <img
        src={imgUrl}
        alt={imgAltText}
        className="h-full w-full"
        aria-hidden
        loading="eager"
        fetchPriority="high"
      />
    </div>
    <Typography variant="h1">{heading}</Typography>
    <Typography className="text-secondary max-w-lg text-center">{description}</Typography>
    {buttonText && to && (
      <Button asChild>
        <Link to={to} aria-label={`Navigate to ${buttonText}`}>
          {buttonText}
        </Link>
      </Button>
    )}
  </div>
);
