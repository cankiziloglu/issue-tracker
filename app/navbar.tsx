'use client';

import { Avatar, Box, Container, DropdownMenu, Flex } from '@radix-ui/themes';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import { AiFillBug } from 'react-icons/ai';

export default function NavBar() {
  const links = [
    {
      title: 'Dashboard',
      href: '/',
    },
    {
      title: 'Issues',
      href: '/issues',
    },
  ];

  const activeLink = usePathname();

  const session = useSession();

  return (
    <nav className='p-5 border-b mb-5'>
      <Container size='3'>
        <Flex gap='4' align='center' justify='between'>
          <Flex gap='4' align='center'>
            <Link href='/'>
              <AiFillBug className='text-2xl' />
            </Link>
            <ul className='flex space-x-6'>
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`${
                      link.href === activeLink
                        ? 'text-zinc-900'
                        : 'text-zinc-500'
                    } hover:text-zinc-800 transition-all`}
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </Flex>
          <Box>
            {session.status === 'authenticated' && (
              <DropdownMenu.Root>
                <DropdownMenu.Trigger>
                  <Avatar
                    src={session.data?.user?.image!}
                    fallback='?'
                    radius='full'
                    size='2'
                    referrerPolicy='no-referrer'
                    className='cursor-pointer'
                  />
                </DropdownMenu.Trigger>
                <DropdownMenu.Content align='end'>
                  <DropdownMenu.Label>
                    {session.data?.user?.email!}
                  </DropdownMenu.Label>
                  <DropdownMenu.Item>
                    <Link href='/api/auth/signout'>Sign out</Link>
                  </DropdownMenu.Item>
                </DropdownMenu.Content>
              </DropdownMenu.Root>
            )}
            {session.status === 'unauthenticated' && (
              <Link href='/api/auth/signin'>Sign in</Link>
            )}
          </Box>
        </Flex>
      </Container>
    </nav>
  );
}
