import prisma from '@/lib/prisma'
import { getSession } from '@auth0/nextjs-auth0'

export default async function Home() {
  const session = await getSession()
  const decks = await prisma.deck.findMany({
    where: { userId: session?.user.sub },
  })

  if (session?.user) {
    return (
      <main className="flex flex-col min-h-screen px-24">
        <div className="flex items-baseline">
          <h1 className="bold text-4xl text-green-600 mb-4 w-1/2 p-2">Your Decks</h1>
          <a
            className="bg-green-500 hover:bg-blue-700 text-white font-bold py-2 px-4 text-2xl rounded ml-auto"
            href="/create"
          >
            New Deck
          </a>
        </div>
        <div className="flex flex-1 flex-col gap-2">
            {decks.map((deck) => (
            <a key={deck.id} href={`/deck/${deck.id}`} className="underline text-blue-600">
                {deck.name}
            </a>
            ))}
        </div>
      </main>
    )
  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="border-4 border-yellow-500 px-8 py-20">
        <p className="font-bold text-green-500 ">Login or Sign up to start creating decks</p>
      </div>
    </main>
  )
}
