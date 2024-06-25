import prisma from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export const GET = async function exportDeck(_req: NextRequest, { params }: { params: { id: string } }) {
  const res = new NextResponse()
  
  const deckId = params.id;
  const allCards = await prisma.deck.findUnique({
    where: { id: deckId },
    include: { cards: { include: { card: { include: { meta: true } } } } },
  })

  return NextResponse.json(allCards, res)
}
