import prisma from '@/lib/prisma'
import { withApiAuthRequired } from '@auth0/nextjs-auth0';
import { NextResponse } from 'next/server';

export const GET = withApiAuthRequired(async function getCards() {
    const res = new NextResponse()
    const allCards = await prisma.card.findMany({ include: { meta: true }});
    return NextResponse.json(allCards, res)
});