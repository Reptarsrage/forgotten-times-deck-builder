'use client'

import { NakedCardMeta, NakedCardWithMeta } from '@/app/api/import/route'
import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import CardForm, { type CardWithMeta } from './CardForm'

export interface ImportCardsDetailsProps {
  cards: NakedCardMeta[]
  version: string
  onSubmit: (cards: NakedCardWithMeta[]) => void
}

export default function ImportCardsDetails({ cards, onSubmit }: ImportCardsDetailsProps) {
  // TODO: Import existing cards by matching ttsCardId
  const [cardsWithInfo, setCardsWithInfo] = useState<CardWithMeta[]>(
    cards.map(
      (card): CardWithMeta => ({
        id: uuidv4(),
        versionId: uuidv4(),
        name: '',
        text: '',
        subtype: '',
        type: '',
        invokeFor: null,
        devotion: null,
        devotionCount: null,
        health: null,
        power: null,
        cost: null,
        meta: {
          id: uuidv4(),
          ttsCardId: card.ttsCardId,
          faceURL: card.faceURL,
          backURL: card.backURL,
          numWidth: card.numWidth,
          numHeight: card.numHeight,
          backIsHidden: card.backIsHidden,
          uniqueBack: card.uniqueBack,
          type: card.type,
          cardId: uuidv4(),
        },
      })
    )
  )

  function onChange(card: CardWithMeta) {
    setCardsWithInfo((prev) => prev.map((c) => (c.id === card.id ? card : c)))
  }

  function handleSubmit() {
    onSubmit(cardsWithInfo)
  }

  return (
    <>
      <div className="flex flex-col gap-8 flex-1 self-stretch">
        {cardsWithInfo.map((card) => (
          <CardForm key={card.id} card={card} onChange={onChange} />
        ))}
      </div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-8 rounded uppercase"
        onClick={handleSubmit}
      >
        Submit
      </button>
    </>
  )
}
