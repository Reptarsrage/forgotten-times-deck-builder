import { CardWithMeta } from '@/components/CardForm'
import EditCards from '@/components/EditCards'
import { isAdmin } from '@/hooks/isAdmin'
import prisma from '@/lib/prisma'
import { withPageAuthRequired } from '@auth0/nextjs-auth0'

export interface VersionPageProps {
  params: {
    id: string
  }
}

async function VersionPage({ params }: VersionPageProps) {
  const hasAccess = isAdmin()

  if (!hasAccess) {
    return <div>Permission denied</div>
  }

  const version = await prisma.version.findFirst({
    where: {
      id: params.id,
    },
    // include cards and meta
    include: {
      cards: {
        include: {
          meta: true,
        },
      },
    },
  })

  if (!version) {
    return <div>Version not found</div>
  }

  const cards = version.cards as CardWithMeta[]

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 gap-4">
      <h1 className="text-4xl font-bold capitalize">Edit cards</h1>
      <span className="bg-gray-100 text-gray-800 me-2 text-sm px-2.5 py-0.5 rounded-full dark:bg-gray-700 dark:text-gray-300">
        {version.name}
      </span>
      <EditCards cards={cards} />
    </main>
  )
}

export default withPageAuthRequired(VersionPage, { returnTo: '/versions' })
