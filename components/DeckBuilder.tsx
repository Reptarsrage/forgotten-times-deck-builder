'use client'

import { PostDeckRequest } from '@/app/api/deck/route'
import { CardWithMeta } from '@/components/CardForm'
import { Deck, Version } from '@prisma/client'
import Image from 'next/image'
import { useMemo, useState } from 'react'
import ArrowDownOnSquareIcon from '@heroicons/react/24/outline/ArrowDownOnSquareIcon'
import Link from 'next/link'

interface DeckCard extends CardWithMeta {
  quantity: number
}

export interface DeckBuilderProps {
  startingDeck?: Deck & { cards: DeckCard[] }
  cards: CardWithMeta[]
  userId: string
  versions: Version[]
}

export default function DeckBuilder(props: DeckBuilderProps) {
  const [version, setVersion] = useState<Version>(props.versions[0])
  const [cards, setCards] = useState<CardWithMeta[]>(props.cards)
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
          versionId: version.id,
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

  async function onVersionChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const newVersion = props.versions.find((v) => v.id === e.target.value)
    if (!newVersion) return
    setVersion(newVersion)
    const response = await fetch(`/api/card?versionId=${newVersion.id}`)
    const newCards: CardWithMeta[] = await response.json()
    setCards(newCards)
  }

  return (
    <>
      <div className="flex items-baseline justify-between">
        <input
          type="text"
          placeholder="Deck Name"
          className="bold text-4xl bg-transparent focus:outline-blue-600 caret-red-500"
          onChange={updateName}
          value={name}
          maxLength={100}
        />
        <button
          className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-6 rounded uppercase flex gap-2"
          onClick={saveDeck}
          disabled={isSaving}
        >
          <ArrowDownOnSquareIcon className="size-6 text-text-white" />
          Save
        </button>
      </div>
      <div className="flex flex-1 divide-x py-4">
        <div className="flex flex-col w-1/4 pr-4">
          <h2 className="bold text-2xl">Deck ({deckCount}/40)</h2>
          <div className="flex flex-1 flex-col gap-2">
            {deck.map((card) => (
              <div key={card.id} className="flex">
                <span className="ml-2">
                  {card.quantity}x{' '}
                  <Link className="underline" href={card.meta.faceURL} target="_blank">
                    {card.name}
                  </Link>
                </span>

                <button className="ml-auto text-red-500" onClick={() => removeCardFromDeck(card)}>
                  x
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col w-3/4 pl-4 gap-4">
          <div className="flex justify-between">
            <h2 className="bold text-2xl">Add cards</h2>
            <select className='focus:outline-blue-600 bg-transparent' onChange={onVersionChange} value={version.id}>
              {props.versions.map((version) => (
                <option key={version.id} value={version.id}>
                  {version.name}
                </option>
              ))}
            </select>
          </div>
          <input
            type="search"
            placeholder="Filter cards..."
            className="bold bg-transparent focus:outline-blue-600 caret-red-500"
            onChange={updateFilter}
          />
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {filteredCards.map((card) => (
              <div key={card.id} className="flex cursor-pointer" onClick={() => addCardToDeck(card)}>
                <Image src={card.meta.faceURL} alt={card.name} width={128} height={179} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
