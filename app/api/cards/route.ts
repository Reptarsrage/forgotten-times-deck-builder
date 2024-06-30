import prisma from '@/lib/prisma'
import { withApiAuthRequired } from '@auth0/nextjs-auth0';
import { Card } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

export const GET = withApiAuthRequired(async function getCards(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams
    const versionId = searchParams.get('versionId')
    const res = new NextResponse()

    let allCards: Card[];
    if (versionId) {
        allCards = await prisma.card.findMany({ where: { versionId: versionId as string }, include: { meta: true } });
    } else {
        allCards = await prisma.card.findMany({ include: { meta: true } });
    }

    return NextResponse.json(allCards, res)
});