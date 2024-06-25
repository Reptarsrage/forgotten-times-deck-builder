import ImportCards from '@/components/ImportCards'
import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import { isAdmin } from '@/hooks/isAdmin'
import { importAllCards } from '@/lib/tabletopImporter'
import { NakedCardMeta } from '../api/import/route'

interface GetCardsResponse {
  cards: NakedCardMeta[]
  version: string
}

async function getCards(): Promise<GetCardsResponse> {
  const { version, cards } = await importAllCards()

  const cardsResponse = cards.map(
    (card) =>
      ({
        ttsCardId: card.id,
        faceURL: card.FaceURL,
        backURL: card.BackURL,
        numWidth: card.NumWidth,
        numHeight: card.NumHeight,
        backIsHidden: card.BackIsHidden,
        uniqueBack: card.UniqueBack,
        type: card.Type,
      } satisfies NakedCardMeta)
  )

  return {
    cards: cardsResponse,
    version,
  }
}

async function ImportPage() {
  const { cards, version } = await getCards()
  const hasAccess = isAdmin()

  if (!hasAccess) {
    return <div>Permission denied</div>
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 gap-4">
      <h1 className="text-4xl font-bold capitalize">Import cards</h1>
      <span className="bg-gray-100 text-gray-800 me-2 text-sm px-2.5 py-0.5 rounded-full dark:bg-gray-700 dark:text-gray-300">
        {version}
      </span>
      <ImportCards cards={cards} version={version} />
    </main>
  )
}

export default withPageAuthRequired(ImportPage, { returnTo: '/import' })
