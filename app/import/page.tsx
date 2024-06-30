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
  const session = await isAdmin()

  if (session?.hasAdminRole !== true) {
    return <div>Permission denied</div>
  }

  return (
    <>
      <h1 className="text-4xl font-bold capitalize">Import cards</h1>
      <span className="bg-slate-300 dark:bg-slate-700 rounded px-2">{version}</span>
      <ImportCards cards={cards} version={version} />
    </>
  )
}

export default withPageAuthRequired(ImportPage, { returnTo: '/import' })
