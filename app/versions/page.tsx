import { isAdmin } from '@/hooks/isAdmin'
import prisma from '@/lib/prisma'
import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import Link from 'next/link'

async function VersionsPage() {
  const hasAccess = isAdmin()

  if (!hasAccess) {
    return <div>Permission denied</div>
  }

  const versions = await prisma.version.findMany()

  return (
    <main className="flex min-h-screen flex-col px-24 pt-12 gap-4">
      <h1 className="text-4xl font-bold capitalize">Versions</h1>
      <div className="flex flex-col gap-4">
        {versions.map((version) => (
          <div key={version.id} className="flex flex-col gap-2 border-t py-4">
            <div className="flex gap-4 items-baseline">
              <h2 className="text-2xl font-semibold">{version.name}</h2>
              <Link href={`/versions/${version.id}`} className="text-blue-600 underline ml-auto">
                Edit
              </Link>
            </div>
            <span className="italic text-gray-300">{version.createdAt.toLocaleDateString()}</span>
          </div>
        ))}
      </div>
    </main>
  )
}

export default withPageAuthRequired(VersionsPage, { returnTo: '/versions' })
