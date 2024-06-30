import type { Metadata } from 'next'
import { UserProvider } from '@auth0/nextjs-auth0/client'
import { Inter } from 'next/font/google'
import './globals.css'
import Nav from '@/components/Nav'
import clsx from 'clsx'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <UserProvider>
        <body className={clsx("flex flex-col min-h-100", inter.className)}>
          <Nav />
          <main className='flex flex-1 flex-col bg-slate-100 dark:bg-slate-900'>
            <div className='flex flex-1 flex-col max-w-4xl m-auto p-8 w-full gap-4'>
                {children}
            </div>
          </main>
          <footer className='bg-slate-50 dark:bg-slate-950 p-4'>
            <p className='text-center text-sm'>
            😀 Made by <a className='underline' href="https://github.com/Reptarsrage/">Reptarsrage</a>
            </p>
          </footer>
        </body>
      </UserProvider>
    </html>
  )
}
