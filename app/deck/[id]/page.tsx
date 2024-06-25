import DeckId from '@/components/DeckId'
import prisma from '@/lib/prisma'

export default async function CreateDeck({ params }: { params: { id: string } }) {
  const deckId = params.id as string
  const deck = await prisma.deck.findUnique({
    where: { id: deckId },
    include: { cards: { include: { card: { include: { meta: true } } } } },
  })

  if (!deck) {
    return <div>Deck not found</div>
  }

  return (
    <main className="flex flex-col min-h-screen px-24">
      <div className="flex items-baseline justify-start p-2">
          <span className="bold text-4xl text-green-600 mr-4">{deck.name}</span>
          <DeckId value={deck.id} />
        <a
          className="bg-yellow-600 hover:bg-yellow-600 text-white font-bold py-2 px-4 text-2xl rounded ml-auto"
          href={`/create/${deckId}`}
        >
          Edit
        </a>
      </div>
      <div className="flex flex-1">
        <div className="flex flex-col">
          <h2 className="bold text-2xl text-purple-600">Deck (/40)</h2>
          <div className="flex flex-1 flex-col gap-2">
            {deck.cards.map((card) => (
              <div key={card.cardId} className="flex">
                <span className="ml-2">
                  {card.quantity}x{' '}
                  <a className="underline text-blue-600" href={card.card.meta?.faceURL} target="_blank">
                    {card.card.name}
                  </a>
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
