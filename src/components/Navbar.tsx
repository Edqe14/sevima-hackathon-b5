import { Button, Loader, Menu } from '@mantine/core';
import { SignOut } from '@phosphor-icons/react';
import { signIn, signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';

export interface NavbarProps {
  authenticated?: boolean;
  rightSide?: React.ReactNode;
}

const AuthenticatedSection = () => {
  const { data, status } = useSession();

  if (status === 'loading') {
    return <Loader />;
  }

  return (
    <>
      <Menu position="bottom-end" offset={15} width={200}>
        <Menu.Target>
          <Image
            src={data?.user?.image as string}
            alt="Profile"
            width={38}
            height={38}
            className="rounded-full cursor-pointer"
          />
        </Menu.Target>

        <Menu.Dropdown>
          <Menu.Item onClick={() => signOut()} color="red" icon={<SignOut />}>
            Log out
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </>
  );
};

export const Navbar = ({ authenticated = true, rightSide }: NavbarProps) => {
  return (
    <nav className="px-8 py-6 flex items-center justify-between w-screen border-b">
      <section className="flex items-center">
        <Link href="/" className="mr-8">
          <h1 className="font-semibold text-2xl tracking-tighter text-red-500">
            Cardify
          </h1>
        </Link>

        <section className="gap-3 text-zinc-600 items-center hidden lg:flex">
          {authenticated && (
            <Link
              href="/dashboard"
              className="transition-colors duration-200 hover:text-zinc-700 "
            >
              Dashboard
            </Link>
          )}
        </section>
      </section>

      <section className="flex items-center gap-4">
        {rightSide}

        {authenticated && <AuthenticatedSection />}
        {!authenticated && (
          <Button onClick={() => signIn('google')}>Login</Button>
        )}
      </section>
    </nav>
  );
};
