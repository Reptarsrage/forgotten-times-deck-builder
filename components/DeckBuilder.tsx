'use client'

import { PostDeckRequest } from '@/app/api/deck/route'
import { CardWithMeta } from '@/components/CardForm'
import { Deck } from '@prisma/client'
import Image from 'next/image'
import { useMemo, useState } from 'react'

interface DeckCard extends CardWithMeta {
  quantity: number
}

export interface DeckBuilderProps {
  startingDeck?: Deck & { cards: DeckCard[] }
  cards: CardWithMeta[]
  userId: string
}

export default function DeckBuilder(props: DeckBuilderProps) {
  const [cards] = useState<CardWithMeta[]>(props.cards)
  const [deck, setDeck] = useState<DeckCard[]>(props.startingDeck?.cards ?? [])
  const deckCount = useMemo(() => deck.reduce((acc, card) => acc + card.quantity, 0), [deck])
  const [isSaving, setIsSaving] = useState(false)
  const [name, setName] = useState(props.startingDeck?.name ?? 'Untitled Deck')
  const [filter, setFilter] = useState('')
  const filteredCards = useMemo(() => {
    if (!filter) return cards
    const lowerCaseFilter = filter.toLowerCase()
    return cards.filter(
      (card) =>
        card.name.toLowerCase().includes(lowerCaseFilter) ||
        card.text.toLowerCase().includes(lowerCaseFilter) ||
        card.subtype.toLowerCase().includes(lowerCaseFilter) ||
        card.type.toLowerCase().includes(lowerCaseFilter)
    )
  }, [cards, filter])

  function updateFilter(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value
    setFilter(value)
  }

  function updateName(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value
    setName(value)
  }

  function addCardToDeck(card: CardWithMeta) {
    const existingCard = deck.find((c) => c.id === card.id)
    if (existingCard) {
      setDeck(deck.map((c) => (c.id === card.id ? { ...c, quantity: c.quantity + 1 } : c)))
    } else {
      setDeck([...deck, { ...card, quantity: 1 }])
    }
  }

  function removeCardFromDeck(card: CardWithMeta) {
    const existingCard = deck.find((c) => c.id === card.id)
    if (existingCard) {
      if (existingCard.quantity > 1) {
        setDeck(deck.map((c) => (c.id === card.id ? { ...c, quantity: c.quantity - 1 } : c)))
      } else {
        setDeck(deck.filter((c) => c.id !== card.id))
      }
    }
  }

  async function saveDeck() {
    setIsSaving(true)

    try {
      const response = await fetch('/api/deck', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: props.startingDeck?.id,
          userId: props.userId,
          name,
          cards: deck.map((card) => ({
            id: card.id,
            quantity: card.quantity,
          })),
        } satisfies PostDeckRequest),
      })

      const newDeck: Deck = await response.json()
      window.location.href = `/deck/${newDeck.id}`
    } catch (error) {
      console.error(error)
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <main className="flex flex-col min-h-screen px-24">
      <div className="flex items-baseline">
        <input
          type="text"
          placeholder="Deck Name"
          className="bold text-4xl text-green-600 mb-4 w-1/2 p-2"
          onChange={updateName}
          value={name}
        />
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 text-4xl rounded ml-auto"
          onClick={saveDeck}
          disabled={isSaving}
        >
          Save
        </button>
      </div>
      <div className="flex flex-1">
        <div className="flex flex-col w-1/4 border-r-4 border-cyan-600 p-4">
          <h2 className="bold text-2xl text-purple-600">Deck ({deckCount}/40)</h2>
          <div className="flex flex-1 flex-col gap-2">
            {deck.map((card) => (
              <div key={card.id} className="flex">
                <span className="ml-2">
                  {card.quantity}x{' '}
                  <a className="underline text-blue-600" href={card.meta.faceURL} target="_blank">
                    {card.name}
                  </a>
                </span>

                <button className='ml-auto text-red-600' onClick={() => removeCardFromDeck(card)}>x</button>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col w-3/4 p-4 gap-4">
          <h2 className="bold text-2xl text-purple-600">Add cards</h2>
          <label>
            Filter
            <input type="search" placeholder="Deck Name" className="ml-2" onChange={updateFilter} />
          </label>
          <div className="grid grid-cols-5 gap-4">
            {filteredCards.map((card) => (
              <div key={card.id} className="flex cursor-pointer" onClick={() => addCardToDeck(card)}>
                <Image src={card.meta.faceURL} alt={card.name} width={128} height={179} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
