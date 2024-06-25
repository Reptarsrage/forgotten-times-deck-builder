'use client'

import CardForm, { CardWithMeta } from './CardForm'

export interface ImportCardsDetailsProps {
  cards: CardWithMeta[]
}

export default function EditCards({ cards }: ImportCardsDetailsProps) {
  // TODO: Import existing cards by matching ttsCardId
  async function onChange(card: CardWithMeta) {
    //    POST to api
    await fetch('/api/edit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(card),
    })
  }

  return (
    <div className="flex flex-col gap-8 flex-1 self-stretch">
      {cards.map((card) => (
        <CardForm key={card.id} card={card} onChange={onChange} />
      ))}
    </div>
  )
}
