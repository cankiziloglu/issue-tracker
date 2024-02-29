'use client';
import { Button, Callout, TextArea, TextField } from '@radix-ui/themes';
import 'easymde/dist/easymde.min.css';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import axios, { AxiosError } from 'axios';
import { AiOutlineWarning } from 'react-icons/ai';
import dynamic from 'next/dynamic';

type IssueForm = {
  title: string;
  description: string;
};

export default function NewIssuePage() {
  
  const SimpleMDE = dynamic(
    () => import("react-simplemde-editor"),
    { ssr: false }
  );
  const { register, handleSubmit, control } = useForm<IssueForm>();
  const router = useRouter();
  const [error, setError] = useState<string>('');
  const onSubmit = async (data: IssueForm) => {
    try {
      await axios.post('/api/issues', data);
      router.push('/issues');
    } catch (error: AxiosError | any) {
      setError(error.response.data[0].message);
    }
  };

  return (
    <div className='max-w-xl space-y-3'>
      {error && (
        <Callout.Root variant='outline' size='1' color='red' role='alert' >
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
        <Controller
          name='description'
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder='Description' {...field} ref={null} />
          )}
        />
        <Button>Submit</Button>
      </form>
    </div>
  );
}
