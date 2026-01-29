import { Button, Typography } from '@/components';
import { amountFormatter, dateFormatter, timeFormatter } from '@/utils';

export const HomePage = () => (
  <div>
    <Button variant="default">Home Page</Button>
    <Button variant="destructive">Home Page</Button>
    <Button variant="secondary">Home Page</Button>
    <Typography as="h1" variant="h1">
      This is heading 1
    </Typography>
    <Typography as="h2" variant="h1">
      This is heading 2
    </Typography>
    <Typography>This is a paragraph</Typography>
    <Typography>{amountFormatter(11111)}</Typography>
    <Typography>{dateFormatter('2023-01-31')}</Typography>
    <Typography>{timeFormatter('2026-01-01T06:30:00Z')}</Typography>
  </div>
);
