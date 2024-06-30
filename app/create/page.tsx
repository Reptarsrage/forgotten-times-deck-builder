import DeckBuilder from '@/components/DeckBuilder'
import prisma from '@/lib/prisma'
import { getSession } from '@auth0/nextjs-auth0'

export default async function CreateDeck() {
  const session = await getSession()
  const versions = await prisma.version.findMany()
  const mostRecentVersion = versions[0]
  const cards: any = await prisma.card.findMany({  where: { versionId: mostRecentVersion.id }, include: { meta: true } })

  return <DeckBuilder cards={cards} userId={session?.user?.sub} versions={versions} />
}
