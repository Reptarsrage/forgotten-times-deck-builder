import prisma from '@/lib/prisma'
import { withApiAuthRequired } from '@auth0/nextjs-auth0'
import { NextResponse } from 'next/server'

export interface PostDeckRequest {
  id?: string
  userId: string
  versionId: string
  name: string
  cards: {
    id: string
    quantity: number
  }[]
}

export const POST = withApiAuthRequired(async function createDeck(req) {
  const res = new NextResponse()
  const request: PostDeckRequest = await req.json()

  if (request.id) {
    const createDeck = await prisma.deck.update({
      where: {
        id: request.id,
      },
      data: {
        name: request.name,
        versionId: request.versionId,
        cards: {
          upsert: request.cards.map((card) => ({
            where: {
              deckId_cardId: {
                cardId: card.id,
                deckId: request.id!,
              },
            },
            create: {
              quantity: card.quantity,
              card: {
                connect: {
                  id: card.id,
                },
              },
            },
            update: {
              quantity: card.quantity,
            },
          })),
        },
      },
    })

    return NextResponse.json(createDeck, res)
  }

  const createDeck = await prisma.deck.create({
    data: {
      userId: request.userId,
      versionId: request.versionId,
      name: request.name,
      cards: {
        create: request.cards.map((card) => ({
          quantity: card.quantity,
          card: {
            connect: {
              id: card.id,
            },
          },
        })),
      },
    },
  })

  return NextResponse.json(createDeck, res)
})
