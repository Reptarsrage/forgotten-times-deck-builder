import DeckBuilder from '@/components/DeckBuilder'
import prisma from '@/lib/prisma'
import { getSession } from '@auth0/nextjs-auth0'

export default async function EditDeck({ params }: { params: { id: string } }) {
  const session = await getSession()
  const deckId = params.id as string
  const versions = await prisma.version.findMany()
  const cards: any = await prisma.card.findMany({ include: { meta: true } }) // meta can be null here which screws up the types
  const deck = await prisma.deck.findUnique({
    where: { id: deckId },
    include: { cards: { include: { card: { include: { meta: true } } } } },
  })

  const deckTransform: any = {
    ...deck,
    cards: deck?.cards.map((card) => ({ ...card.card, quantity: card.quantity })) ?? [],
  }

  return <DeckBuilder cards={cards} startingDeck={deckTransform} userId={session?.user?.sub} versions={versions} />
}
