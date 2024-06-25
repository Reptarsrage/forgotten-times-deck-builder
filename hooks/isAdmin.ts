import { getSession } from '@auth0/nextjs-auth0'

const NAMESPACE = 'https://github.com/Reptarsrage'

export async function isAdmin() {
  const user = await getSession()

  if (user?.[`${NAMESPACE}/roles`]?.includes('admin')) {
    return true
  }

  return false
}

