'use client';

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

  return (
    <nav className='p-2 border-b mb-5'>
      <ul className='flex space-x-6 h-14 items-center'>
        <Link href='/'>
          <AiFillBug className='text-2xl' />
        </Link>
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`${link.href === activeLink ? 'text-zinc-900' : 'text-zinc-500'} hover:text-zinc-800 transition-all`}
          >
            {link.title}
          </Link>
        ))}
      </ul>
    </nav>
  );
}
