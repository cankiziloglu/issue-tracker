'use client';
import ErrMsg from '@/app/components/ErrMsg';
import Spinner from '@/app/components/Spinner';
import { IssueSchema } from '@/app/validationSchemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { Issue } from '@prisma/client';
import { Button, Callout, TextField } from '@radix-ui/themes';
import axios, { AxiosError } from 'axios';
import 'easymde/dist/easymde.min.css';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { AiOutlineWarning } from 'react-icons/ai';
import { z } from 'zod';

type IssueFormData = z.infer<typeof IssueSchema>;

export default function IssueForm({ issue }: { issue?: Issue }) {
  const SimpleMDE = dynamic(() => import('react-simplemde-editor'), {
    ssr: false,
  });

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IssueFormData>({
    resolver: zodResolver(IssueSchema),
  });

  const router = useRouter();

  const [error, setError] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const onSubmit = async (data: IssueFormData) => {
    try {
      setIsSubmitting(true);
      if (issue) {
        await axios.patch(`/api/issues/${issue.id}`, data);
        router.push(`/issues/${issue.id}`);
        router.refresh();
      } else {
        await axios.post('/api/issues', data);
        router.push('/issues');
        router.refresh();
      }
    } catch (error: AxiosError | any) {
      setIsSubmitting(false);
      setError('An Unexpected error occurred. Please try again later.');
    }
  };

  return (
    <div className='max-w-xl space-y-3'>
      {error && (
        <Callout.Root variant='outline' size='1' color='red' role='alert'>
          <Callout.Icon>
            <AiOutlineWarning />
          </Callout.Icon>
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form className='space-y-3' onSubmit={handleSubmit(onSubmit)}>
        <TextField.Root>
          <TextField.Input
            placeholder='Title'
            {...register('title')}
            defaultValue={issue?.title}
          />
        </TextField.Root>
        <ErrMsg>{errors.title?.message}</ErrMsg>
        <Controller
          name='description'
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder='Description' {...field} ref={null} />
          )}
          defaultValue={issue?.description}
        />
        <ErrMsg>{errors.description?.message}</ErrMsg>
        <Button disabled={isSubmitting}>
          {issue ? 'Update Issue' : 'Create Issue'}{' '}
          {isSubmitting && <Spinner />}
        </Button>
      </form>
    </div>
  );
}
