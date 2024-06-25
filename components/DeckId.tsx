'use client'

import { useState } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'

export interface DeckIdProps {
  value: string
}

export default function DeckId({ value }: DeckIdProps) {
  const [copied, setCopied] = useState(false)

  return (
    <>
      <CopyToClipboard text={value} onCopy={() => setCopied(true)}>
        <button className='rounded-full bg-slate-600 px-4 py-1 text-white'>{value}</button>
      </CopyToClipboard>
      {copied && <span className='ml-2'>Copied!</span>}
    </>
  )
}
