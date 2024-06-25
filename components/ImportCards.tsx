'use client'

import type { NakedCardMeta, NakedCardWithMeta } from '@/app/api/import/route'
import { useState } from 'react'
import ImportCardsSelect from './ImportCardsSelect'
import ImportCardsDetails from './ImportCardDetails'

export interface ImportCardsProps {
  cards: NakedCardMeta[]
  version: string
}

export default function ImportCards({ cards, version }: ImportCardsProps) {
  const [selected, setSelected] = useState<NakedCardMeta[] | null>(null)

  function onSelected(selectedCards: NakedCardMeta[]) {
    setSelected(selectedCards)
  }

  async function onSubmit(submitted: NakedCardWithMeta[]) {
    await fetch('/api/import', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        cards: submitted,
        version,
      }),
    })

    // navigate to /versions
    window.location.href = '/versions'
  }

  if (selected) {
    return <ImportCardsDetails cards={selected} version={version} onSubmit={onSubmit} />
  }

  return <ImportCardsSelect cards={cards} onSelected={onSelected} />
}
