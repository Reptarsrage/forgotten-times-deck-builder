import { isAdmin } from '@/hooks/isAdmin'
import prisma from '@/lib/prisma'
import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import Link from 'next/link'
import PlusIcon from '@heroicons/react/24/outline/PlusIcon'

async function VersionsPage() {
  const session = await isAdmin()

  if (session?.hasAdminRole !== true) {
    return <div>Permission denied</div>
  }

  const versions = await prisma.version.findMany()

  return (
    <>
      <div className="flex items-baseline justify-between">
        <h1 className="text-4xl mb-4 w-1/2">Versions</h1>
        <a
          className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-6 rounded uppercase flex gap-2"
          href="/import"
        >
          <PlusIcon className="size-6 text-text-white" />
          Start Import
        </a>
      </div>
      <div className="flex flex-1 flex-col gap-2">
        {versions.map((version) => (
          <Link key={version.id} href={`/versions/${version.id}`} className="bg-slate-50 dark:bg-slate-950 p-4">
            <span className="flex gap-4">
              <span className="font-bold mr-auto">{version.name}</span>
              <span className="">{version.createdAt.toLocaleString()}</span>
            </span>
          </Link>
        ))}
      </div>
    </>
  )
}

export default withPageAuthRequired(VersionsPage, { returnTo: '/versions' })
