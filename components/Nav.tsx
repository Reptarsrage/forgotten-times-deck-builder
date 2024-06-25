import { getSession } from '@auth0/nextjs-auth0'

export default async function Nav() {
  // const { user, error, isLoading } = useUser(); // Client side
  const session = await getSession()

  return (
    <div className="flex p-2 gap-2 border-b-2 border-b-fuchsia-500 items-baseline">
      <a href="/" className="text-2xl font-bold text-fuchsia-500">
        Forgotton Times TCG Deck Builder
      </a>

      <div className="flex gap-2 ml-auto">
        {session?.user ? (
          <div className="flex gap-2 items-baseline">
            <span>{session.user.email}</span>
            <a
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-8 rounded uppercase"
              href="/api/auth/logout"
            >
              Logout
            </a>
          </div>
        ) : (
          <>
            <a
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-8 rounded uppercase"
              href="/api/auth/signup"
            >
              Sign Up
            </a>
            <a
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-8 rounded uppercase"
              href="/api/auth/login"
            >
              Login
            </a>
          </>
        )}
      </div>
    </div>
  )
}
