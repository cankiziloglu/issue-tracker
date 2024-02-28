import Link from 'next/link';
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
            className='flex space-x-6 hover:text-zinc-900 text-zinc-600 transition-all'
          >
            {link.title}
          </Link>
        ))}
      </ul>
    </nav>
  );
}
