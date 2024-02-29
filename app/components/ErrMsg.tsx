import { Text } from '@radix-ui/themes';
import React, { PropsWithChildren } from 'react';

export default function ErrMsg({ children }: PropsWithChildren) {
  if (!children) return null;
  return (
    <Text color='red' as='p' size='2' weight='medium'>
      {children}
    </Text>
  );
}
