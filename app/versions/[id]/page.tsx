import { CardWithMeta } from '@/components/CardForm'
import EditCards from '@/components/EditCards'
import { isAdmin } from '@/hooks/isAdmin'
import prisma from '@/lib/prisma'
import { withPageAuthRequired } from '@auth0/nextjs-auth0'


export default withPageAuthRequired(async function VersionPage({ params }) {
  const session = await isAdmin()

  if (session?.hasAdminRole !== true) {
    return <div>Permission denied</div>
  }

  const version = await prisma.version.findFirst({
    where: {
      id: params!.id as string,
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
    <div className='gap-4 flex flex-col justify-start'>
        <div className='flex justify-between items-baseline'>
      <h1 className="text-4xl font-bold capitalize">Edit cards</h1>
      <span className="bg-slate-300 dark:bg-slate-700 rounded px-2">{version.name}</span>
      </div>
      <EditCards cards={cards} />
    </div>
  )
}, { returnTo: '/versions' })
