'use client'

import { useState } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import ClipboardIcon from '@heroicons/react/24/outline/ClipboardIcon'

export interface DeckIdProps {
  value: string
}

export default function DeckId({ value }: DeckIdProps) {
  const [copied, setCopied] = useState(false)

  return (
    <span className='flex items-center text-sm'>
      <CopyToClipboard text={value} onCopy={() => setCopied(true)}>
        <button className='rounded-full bg-slate-600 px-4 py-1 text-white flex items-center'>
            {value}
            <ClipboardIcon className='size-5 ml-2' />
        </button>
      </CopyToClipboard>
      {copied && <span className='ml-2'>Copied!</span>}
    </span>
  )
}
