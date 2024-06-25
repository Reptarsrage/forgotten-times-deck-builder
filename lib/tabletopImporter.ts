import { NextResponse } from 'next/server'

type CardId = string

interface Config {
  VersionNumber: string
  ObjectStates: ObjectState[]
}

interface ObjectState {
  CustomDeck?: Record<CardId, Card | unknown>
}

interface Card {
  FaceURL: string
  BackURL: string
  NumWidth: number
  NumHeight: number
  BackIsHidden: boolean
  UniqueBack: boolean
  Type: number
}

interface CardWithId extends Card {
  id: CardId
}

function isCard(obj: any): obj is Card {
  return obj.FaceURL !== undefined
}

export async function importAllCards() {
  const res = new NextResponse()
  const data: Config = await import('@/data/3268820134.json')
  if (!data) {
    return {
      cards: [],
      version: '0',
    }
  }

  const cardLookup: Record<CardId, Card> = {}
  data.ObjectStates.forEach((state: any) => {
    if (state.CustomDeck) {
      Object.entries(state.CustomDeck).forEach(([id, card]) => {
        if (isCard(card) && !cardLookup[id]) {
          cardLookup[id] = card
        }
      })
    }
  })

  return {
    cards: Object.entries(cardLookup).map(([id, card]) => ({ ...card, id } as CardWithId)),
    version: data.VersionNumber,
  }
}
