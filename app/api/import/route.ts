import { withApiAuthRequired } from '@auth0/nextjs-auth0'
import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { CardMeta, Card } from '@prisma/client'

export type NakedCardMeta = Omit<CardMeta, 'id' | 'card' | 'cardId'>
export type NakedCard = Omit<Card, 'id' | 'versionId' | 'meta'>
export type NakedCardWithMeta = NakedCard & { meta: NakedCardMeta }

export interface PostImportRequest {
  cards: NakedCardWithMeta[]
  version: string
}

export const POST = withApiAuthRequired(async function importCards(req) {
  const res = new NextResponse()
  const data: PostImportRequest = await req.json()

  await prisma.version.create({
    data: {
      name: data.version,
      cards: {
        create: data.cards.map((card) => ({
          name: card.name,
          text: card.text,
          subtype: card.subtype,
          type: card.type, // Guardian, Spell, Enchantment, Relic
          invokeFor: card.invokeFor,
          devotion: card.devotion, // Order, Chaos
          devotionCount: card.devotionCount,
          health: card.health,
          power: card.power,
          cost: card.cost,
          meta: {
            create: {
              ttsCardId: card.meta.ttsCardId,
              faceURL: card.meta.faceURL,
              backURL: card.meta.backURL,
              numWidth: card.meta.numWidth,
              numHeight: card.meta.numHeight,
              backIsHidden: card.meta.backIsHidden,
              uniqueBack: card.meta.uniqueBack,
              type: card.meta.type,
            },
          },
        })),
      },
    },
  })

  return NextResponse.json({ success: true }, res)
})
