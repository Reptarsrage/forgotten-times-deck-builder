
import DeckBuilder from '@/components/DeckBuilder'
import prisma from '@/lib/prisma'
import { getSession } from '@auth0/nextjs-auth0'

export default async function CreateDeck() {
  const session = await getSession()
  const cards: any = await prisma.card.findMany({ include: { meta: true } })
  
  return (
    <DeckBuilder cards={cards} userId={session?.user?.sub} />
  )
}
