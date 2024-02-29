'use client';
import { Button, TextArea, TextField } from '@radix-ui/themes';
import SimpleMDE from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';

type IssueForm = {
  title: string;
  description: string;
};

export default function NewIssuePage() {
  const { register, handleSubmit, control } = useForm<IssueForm>();
  const router = useRouter();
  const onSubmit = async (data: IssueForm) => {
    await fetch('/api/issues', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    router.push('/issues');
  };

  return (
    <form className='max-w-xl space-y-3' onSubmit={handleSubmit(onSubmit)}>
      <TextField.Root>
        <TextField.Input placeholder='Title' {...register('title')} />
      </TextField.Root>
      <Controller
        name='description'
        control={control}
        render={({ field }) => (
          <SimpleMDE placeholder='Description' {...field} />
        )}
      />
      <Button>Submit</Button>
    </form>
  );
}
