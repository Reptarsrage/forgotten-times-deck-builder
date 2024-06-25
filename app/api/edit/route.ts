import { withApiAuthRequired } from '@auth0/nextjs-auth0'
import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { CardWithMeta } from '@/components/CardForm'

export const POST = withApiAuthRequired(async function importCards(req) {
  const res = new NextResponse()
  const data: CardWithMeta = await req.json()

  await prisma.card.update({
    where: {
      id: data.id,
    },
    data: {
      ...data,
      meta: undefined
    },
  })

  return NextResponse.json({ success: true }, res)
})
