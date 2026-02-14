import {
  AccordianCheckboxSkeleton,
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Checkbox,
  Field,
  FieldGroup,
  FieldLabel,
  Typography,
} from '@/components';
import { useGenreListQuery } from '@/services';

import type { GenreFilterProps } from './GenreFilter.types';

export const GenreFilter = ({ value, onChange }: GenreFilterProps) => {
  const genreQuery = useGenreListQuery();
  const genreData = genreQuery.data ?? [];

  const toggleGenre = (id: number, checked: boolean) => {
    if (checked) {
      onChange([...value, id]);
    } else {
      onChange(value.filter((genreId) => genreId !== id));
    }
  };

  return (
    <Accordion type="single" collapsible key={'genre-' + genreData.length}>
      <AccordionItem value="genre">
        <AccordionTrigger>
          <Typography tag="h3" variant="h4">
            Genre
          </Typography>
        </AccordionTrigger>
        <AccordionContent>
          <FieldGroup>
            {genreQuery.isLoading
              ? Array.from({ length: 5 }).map((_, i) => <AccordianCheckboxSkeleton key={i} />)
              : genreData.map((genre) => (
                  <Field key={genre.id} orientation="horizontal">
                    <Checkbox
                      id={`genre-${genre.id}`}
                      checked={value.includes(genre.id)}
                      onCheckedChange={(checked) => toggleGenre(genre.id, !!checked)}
                    />
                    <FieldLabel htmlFor={`genre-${genre.id}`}>{genre.name}</FieldLabel>
                  </Field>
                ))}
          </FieldGroup>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
