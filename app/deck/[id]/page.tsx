import DeckId from '@/components/DeckId'
import prisma from '@/lib/prisma'
import PencilIcon from '@heroicons/react/24/outline/PencilIcon'
import Link from 'next/link'

export default async function CreateDeck({ params }: { params: { id: string } }) {
  const deckId = params.id as string
  const deck = await prisma.deck.findUnique({
    where: { id: deckId },
    include: { cards: { include: { card: { include: { meta: true } } } } },
  })

  if (!deck) {
    return <div>Deck not found</div>
  }

  const deckCount = deck.cards.reduce((acc, card) => acc + card.quantity, 0)

  return (
    <>
      <div className="flex items-baseline justify-between">
        <span className="text-4xl">{deck.name}</span>
        <Link
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded uppercase flex gap-2"
          href={`/create/${deckId}`}
        >
          <PencilIcon className="size-6 text-text-white" />
          Edit
        </Link>
      </div>
      <DeckId value={deck.id} />
      <div className="flex flex-1 divide-x py-4">
        <div className="flex flex-col w-1/4 pr-4">
          <h2 className="bold text-2xl">Deck ({deckCount}/40)</h2>
          <div className="flex flex-1 flex-col gap-2">
            {deck.cards.map((card) => (
              <div key={card.card.id} className="flex">
                <span className="ml-2">
                  {card.quantity}x{' '}
                  <Link className="underline text-blue-600" href={card.card.meta?.faceURL ?? ''} target="_blank">
                    {card.card.name}
                  </Link>
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col w-3/4 pl-4 gap-4">{/* TODO: Add some graphs or something */}</div>
      </div>
    </>
  )
}
