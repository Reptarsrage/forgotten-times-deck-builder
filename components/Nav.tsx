import { getSession } from '@auth0/nextjs-auth0'
import Image from 'next/image'
import UserPlusIcon from '@heroicons/react/24/outline/UserPlusIcon'
import ArrowRightEndOnRectangleIcon from '@heroicons/react/24/outline/ArrowRightEndOnRectangleIcon'
import ArrowRightStartOnRectangleIcon from '@heroicons/react/24/outline/ArrowRightStartOnRectangleIcon'
import SparklesIcon from '@heroicons/react/24/outline/SparklesIcon'
import Link from 'next/link'
import { isAdmin } from '@/hooks/isAdmin'

export default async function Nav() {
  const session = await isAdmin()

  return (
    <header className="flex p-2 gap-2 bg-slate-50 dark:bg-slate-950 items-baseline">
      <Link href="/" className="text-2xl font-bold">
        <Image
          src="/icon-200x200.png"
          alt="Forgotton Times TCG Deck Builder"
          width={39}
          height={39}
          className="inline"
        />
        <span className="ml-4 hidden md:inline">Forgotton Times TCG Deck Builder</span>
      </Link>

      <div className="flex gap-2 ml-auto">
        {session?.user ? (
          <div className="flex gap-2 items-baseline">
            {session?.hasAdminRole && (
              <Link
                className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-6 rounded uppercase flex gap-2"
                href="/versions"
              >
                <SparklesIcon className="size-6 text-text-white" />
                Manage
              </Link>
            )}
            <Link
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded uppercase flex gap-2"
              href="/api/auth/logout"
            >
              <ArrowRightStartOnRectangleIcon className="size-6 text-text-white" />
              Logout
            </Link>
          </div>
        ) : (
          <>
            <Link
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded uppercase flex gap-2"
              href="/api/auth/signup"
            >
              <UserPlusIcon className="size-6 text-text-white" />
              Sign Up
            </Link>
            <Link
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded uppercase flex gap-2"
              href="/api/auth/login"
            >
              <ArrowRightEndOnRectangleIcon className="size-6 text-text-white" />
              Login
            </Link>
          </>
        )}
      </div>
    </header>
  )
}
