'use client'

import { NakedCardMeta } from '@/app/api/import/route'
import clsx from 'clsx'
import { useState } from 'react'
import Image from 'next/image'

export interface ImportCardListProps {
  cards: NakedCardMeta[]
  onSelected: (cards: NakedCardMeta[]) => void
}

export default function ImportCardList({ cards, onSelected }: ImportCardListProps) {
  const [deselected, setDeselected] = useState<Set<string>>(new Set())
  const [counter, setCounter] = useState(cards.length)

  function deselect(e: React.MouseEvent<HTMLDivElement>) {
    const id = e.currentTarget.getAttribute('data-id')
    if (!id) {
      return
    }

    setDeselected((prev) => {
      const next = new Set(prev)
      if (prev.has(id)) {
        next.delete(id)
        setCounter(counter + 1)
      } else {
        next.add(id)
        setCounter(counter - 1)
      }
      return next
    })
  }

  async function onConfirm() {
    const selected = cards.filter((card) => !deselected.has(card.ttsCardId))
    onSelected(selected)
  }

  return (
    <>
      <div className="grid grid-cols-3 gap-4">
        {cards.map((card) => (
          <div
            key={card.ttsCardId}
            data-id={card.ttsCardId}
            onClick={deselect}
            className={clsx('flex flex-col items-center', deselected.has(card.ttsCardId) && 'opacity-50')}
            title={JSON.stringify(card, null, 2)}
          >
            <Image src={card.faceURL} alt="Card" width={128} height={179} />
            <span>{card.ttsCardId}</span>
          </div>
        ))}
      </div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-8 rounded uppercase"
        onClick={onConfirm}
      >
        Import {counter} Cards
      </button>
    </>
  )
}
