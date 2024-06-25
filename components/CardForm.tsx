'use client'

import { useDebounce } from 'rooks'
import { useState } from 'react'
import Image from 'next/image'
import { Card, CardMeta } from '@prisma/client'

export interface CardWithMeta extends Card {
  meta: CardMeta
}

export interface CardFormProps {
  card: CardWithMeta
  onChange: (card: CardWithMeta) => void
}

export default function CardForm({ card, onChange }: CardFormProps) {
  const [name, setName] = useState(card.name)
  const [text, setText] = useState(card.text)
  const [subtype, setSubType] = useState(card.subtype)
  const [type, setType] = useState(card.type)
  const [devotion, setDevotion] = useState(card.devotion)
  const [cost, setCost] = useState(card.cost)
  const [devotionCount, setDevotionCount] = useState(card.devotionCount)
  const [invokeFor, setInvokeFor] = useState(card.invokeFor)
  const [power, setPower] = useState(card.power)
  const [health, setHealth] = useState(card.health)

  function doUpdate() {
    onChange({
      ...card,
      name,
      text,
      subtype,
      type,
      devotion,
      cost,
      devotionCount,
      invokeFor,
      power,
      health,
    })
  }

  const doUpdateDebounced = useDebounce(doUpdate, 500)

  const onNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
    doUpdateDebounced()
  }
  const onTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value)
    doUpdateDebounced()
  }
  const onSubTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSubType(e.target.value)
    doUpdateDebounced()
  }
  const onTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setType(e.target.value)
    doUpdateDebounced()
  }
  const onDevotionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setDevotion(e.target.value)
    doUpdateDebounced()
  }
  const onCostChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10)
    setCost(isNaN(value) ? null : value)
    doUpdateDebounced()
  }
  const onDevotionCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10)
    setDevotionCount(isNaN(value) ? null : value)
    doUpdateDebounced()
  }
  const onInvokeForChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10)
    setInvokeFor(isNaN(value) ? null : value)
    doUpdateDebounced()
  }
  const onPowerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10)
    setPower(isNaN(value) ? null : value)
    doUpdateDebounced()
  }
  const onHealthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10)
    setHealth(isNaN(value) ? null : value)
    doUpdateDebounced()
  }

  return (
    <div className="flex flex-1 gap-4">
      <div className="w-32">
        <Image src={card.meta.faceURL} alt="Card" width={128} height={179} />
      </div>
      <div className="flex flex-1 flex-col gap-2">
        <div className="flex flex-col">
          <label>Name</label>
          <input type="text" value={name} name="name" onChange={onNameChange} className="pl-1" />
        </div>

        <div className="flex flex-col">
          <label>Text</label>
          <textarea value={text} name="text" onChange={onTextChange} className="pl-1" />
        </div>

        <div className="flex flex-col">
          <label>Subtype</label>
          <input value={subtype} name="subtype" onChange={onSubTypeChange} className="pl-1" />
        </div>

        <div className="flex gap-8">
          <div className="flex flex-col">
            <label>Type</label>
            <select value={type ?? ''} name="type" onChange={onTypeChange} className="w-32 pl-1">
              <option value="" hidden></option>
              <option value="guardian">Guardian</option>
              <option value="spell">Spell</option>
              <option value="enchantment">Enchantment</option>
              <option value="relic">Relic</option>
              <option value="runeseeker">RuneSeeker</option>
            </select>
          </div>

          <div className="flex flex-col">
            <label>Devotion</label>
            <select value={devotion ?? ''} name="devotion" onChange={onDevotionChange} className="w-32 pl-1">
              <option value="" hidden></option>
              <option value="chaos">Chaos</option>
              <option value="order">Order</option>
            </select>
          </div>
        </div>

        <div className="flex gap-8">
          <div className="flex flex-col">
            <label>Cost</label>
            <input type="number" value={cost ?? ''} name="cost" onChange={onCostChange} className="w-32 pl-1" />
          </div>

          <div className="flex flex-col">
            <label>Power</label>
            <input type="number" value={power ?? ''} name="power" onChange={onPowerChange} className="w-32 pl-1" />
          </div>

          <div className="flex flex-col">
            <label>Health</label>
            <input type="number" value={health ?? ''} name="health" onChange={onHealthChange} className="w-32 pl-1" />
          </div>
        </div>

        <div className="flex gap-8">
          <div className="flex flex-col">
            <label>Devotion Count</label>
            <input
              type="number"
              value={devotionCount ?? ''}
              name="devotionCount"
              onChange={onDevotionCountChange}
              className="w-32 pl-1"
            />
          </div>

          <div className="flex flex-col">
            <label>Invoke for</label>
            <input
              type="number"
              value={invokeFor ?? ''}
              name="invokeFor"
              onChange={onInvokeForChange}
              className="w-32 pl-1"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
