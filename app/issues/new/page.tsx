'use client';
import { Button, Callout, TextArea, TextField } from '@radix-ui/themes';
import 'easymde/dist/easymde.min.css';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import axios, { AxiosError } from 'axios';
import { AiOutlineWarning } from 'react-icons/ai';
import dynamic from 'next/dynamic';
import { set, z } from 'zod';
import { createIssueSchema } from '@/app/validationSchemas';
import { zodResolver } from '@hookform/resolvers/zod';
import ErrMsg from '@/app/components/ErrMsg';
import Spinner from '@/app/components/Spinner';

type IssueForm = z.infer<typeof createIssueSchema>;

export default function NewIssuePage() {
  const SimpleMDE = dynamic(() => import('react-simplemde-editor'), {
    ssr: false,
  });

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IssueForm>({
    resolver: zodResolver(createIssueSchema),
  });

  const router = useRouter();

  const [error, setError] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const onSubmit = async (data: IssueForm) => {
    try {
      setIsSubmitting(true);
      await axios.post('/api/issues', data);
      router.push('/issues');
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
          <TextField.Input placeholder='Title' {...register('title')} />
        </TextField.Root>
        <ErrMsg>{errors.title?.message}</ErrMsg>
        <Controller
          name='description'
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder='Description' {...field} ref={null} />
          )}
        />
        <ErrMsg>{errors.description?.message}</ErrMsg>
        <Button disabled={isSubmitting}>
          Submit
          {isSubmitting && <Spinner />}
        </Button>
      </form>
    </div>
  );
}
