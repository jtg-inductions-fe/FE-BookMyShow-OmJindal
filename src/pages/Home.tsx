import { Button } from '@/components';
import { Typography } from '@/components';
import { dateFormatter, numberFormatter } from '@/utils';

export const Home = () => (
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
    <Typography>{numberFormatter(11111)}</Typography>
    <Typography>{dateFormatter('2023-01-31', 'D MMM, YYYY')}</Typography>
  </div>
);
