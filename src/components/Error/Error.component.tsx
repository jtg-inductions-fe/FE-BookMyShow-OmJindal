import { Button } from '@/components/Button';
import { Typography } from '@/components/Typography';

import type { ErrorComponentProps } from './Error.types';

export const ErrorComponent = ({
  imgUrl,
  imgAltText,
  heading,
  description,
  buttonText,
  to,
}: ErrorComponentProps) => (
  <section
    className="mx-auto flex flex-col items-center justify-center gap-6 px-5 max-w-90 lg:max-w-140 text-center"
    aria-labelledby="heading"
  >
    <div className="h-60 w-82 lg:h-105 lg:w-140">
      <img src={imgUrl} alt={imgAltText} className="h-full w-full" />
    </div>
    <Typography tag="h1" id="heading">
      {heading}
    </Typography>
    <Typography tag="p" variant="secondary">
      {description}
    </Typography>
    {buttonText && to && (
      <Button asLink to={to}>
        {buttonText}
      </Button>
    )}
  </section>
);
