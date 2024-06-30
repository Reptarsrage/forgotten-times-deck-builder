import { getSession } from '@auth0/nextjs-auth0'

const NAMESPACE = 'https://github.com/Reptarsrage'
const ADMIN_ROLE = 'deckbuilder-admin'

export async function isAdmin() {
  const session = await getSession()
  if (!session) {
    return null
  }

  const { user } = session
  const hasAdminRole = user?.[`${NAMESPACE}/roles`]?.includes(ADMIN_ROLE) ?? false

  return {
    ...session,
    hasAdminRole,
  }
}
