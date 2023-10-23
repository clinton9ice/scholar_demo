
import type { Metadata } from 'next'
import {TopNav, SideNav} from '@/components'
import { Inter } from 'next/font/google'
import './globals.css'
import { Provider } from '@/store'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Scholar',
  description: 'Scholar is a school management system.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="en">
      <body className={inter.className}>
        <section className="max-w-[1800px] mx-auto w-full">
          <Provider>
          <div className="flex min-h-screen justify-between">
            <SideNav />

            <section className="flex-1">
              <TopNav />
              
              <div className="mt-10 px-5">
                {children}
              </div>
            </section>

          </div>
          </Provider>
        </section>
      </body>
    </html>
  )
}
