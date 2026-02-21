import { Card, CardContent, Field, FieldGroup, Skeleton } from '@/components';

export const EditProfileSkeleton = () => (
  <div>
    <Skeleton className="h-12 w-40" />
    <Card>
      <CardContent>
        <FieldGroup>
          <div className="space-y-10 mb-10">
            <Field>
              <div className="flex flex-col items-center gap-2">
                <Skeleton className="h-25 w-25 rounded-full" />
                <Skeleton className="h-4 w-24" />
              </div>
            </Field>
            <Field>
              <Skeleton className="h-4 max-w-30 mb-2" />
              <Skeleton className="h-10 w-full" />
            </Field>
            <Field>
              <Skeleton className="h-4 max-w-30 mb-2" />
              <Skeleton className="h-10 w-full" />
            </Field>
          </div>
          <div className="flex flex-col justify-center sm:flex-row gap-5 *:w-full sm:*:w-1/2">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
          </div>
        </FieldGroup>
      </CardContent>
    </Card>
  </div>
);
