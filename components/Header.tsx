'use client';

import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { IoArrowBackOutline } from 'react-icons/io5';

import { DynamicConnectButton, useIsLoggedIn } from '@/lib/dynamicxyz';
import Link from './Link';
import Logo from './Logo';

interface HeaderNavLink {
  href: string;
  title: string;
}

const headerNavLinks: HeaderNavLink[] = [
  { href: '/', title: 'Home' },
  { href: '/send', title: 'Send Pix' },
  { href: '/receive', title: 'Receive Pix' },
  { href: '/wallet', title: 'My Wallet' },
];

const variants = {
  hidden: { opacity: 0, x: 0, y: 15 },
  enter: { opacity: 1, x: 0, y: 0 },
  exit: { opacity: 0, x: 0, y: -10 },
};

const Header = () => {
  const isLoggedIn = useIsLoggedIn();
  const pathname = usePathname();

  return (
    <header className="w-full flex animate-background bg-[length:_400%_400%] [animation-duration:_10s] bg-gradient-to-r from-pink-500 dark:from-pink-500/55 via-purple-300 dark:via-purple-300/55 to-cyan-300 dark:to-cyan-300/55 pb-0.5">
      <div className="h-full w-full flex justify-between bg-white dark:bg-slate-800 p-6">
        <motion.div
          id={pathname}
          key={pathname}
          variants={variants}
          initial="hidden"
          animate="enter"
          exit="exit"
          transition={{
            y: { type: 'spring', stiffness: 300, damping: 20 },
            opacity: { duration: 0.15 },
          }}
        >
          {['/', '/signin'].includes(pathname) ? (
            <>
              <Logo />
            </>
          ) : (
            <>
              <div className="flex h-6 items-center">
                <button
                  type="button"
                  className="text-3xl text-pink-500"
                  onClick={() => {
                    history.back();
                  }}
                >
                  <IoArrowBackOutline />
                </button>
                <span className="ml-4 text-2xl">
                  {headerNavLinks.find((link) => link.href === pathname)?.title}
                </span>
              </div>
            </>
          )}
        </motion.div>

        <div className="flex items-center space-x-4 leading-5 sm:space-x-6">
          {isLoggedIn ? (
            <>
              {headerNavLinks
                .filter((link) => link.href !== '/')
                .map((link) => (
                  <Link
                    key={link.title}
                    href={link.href}
                    className="hidden font-medium text-slate-800 dark:text-white sm:block uppercase hover:text-pink-500"
                  >
                    {link.title}
                  </Link>
                ))}
            </>
          ) : (
            <>
              {pathname !== '/signin' && (
                <DynamicConnectButton buttonClassName="font-medium text-slate-800 dark:text-white sm:block uppercase hover:text-pink-500">
                  Signin
                </DynamicConnectButton>
              )}
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
