import prisma from '@/lib/prisma'
import { getSession } from '@auth0/nextjs-auth0'
import PlusIcon from '@heroicons/react/24/outline/PlusIcon'
import Link from 'next/link'

export default async function Home() {
  const session = await getSession()
  const decks = await prisma.deck.findMany({
    where: { userId: session?.user.sub },
    include: { version: true },
  })

  if (session?.user) {
    return (
      <>
        <div className="flex items-baseline justify-between">
          <h1 className="text-4xl mb-4 w-1/2">Your Decks</h1>
          <Link
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-6 rounded uppercase flex gap-2"
            href="/create"
          >
            <PlusIcon className="size-6 text-text-white" />
            New Deck
          </Link>
        </div>
        <div className="flex flex-1 flex-col gap-2">
          {decks.map((deck) => (
            <Link key={deck.id} href={`/deck/${deck.id}`} className="bg-slate-50 dark:bg-slate-950 p-4">
              <span className="flex gap-4">
                <span className="font-bold mr-auto">{deck.name}</span>
                <span className="bg-slate-300 dark:bg-slate-700 rounded px-2">{deck.version.name}</span>
                <span className="">{deck.createdAt.toLocaleString()}</span>
              </span>
            </Link>
          ))}
        </div>
      </>
    )
  }
  return (
    <div className='flex justify-center items-center'>
      <div className="max-w-md rounded overflow-hidden shadow-lg bg-slate-50 dark:bg-slate-950 p-8 text-center">
        <h2 className="font-bold text-xl mb-2">👋 Welcome!</h2>
        <p>Please log in or sign up to start creating decks</p>
      </div>
    </div>
  )
}
