'use client'

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { useState } from "react"

const inter = Inter({ subsets: ['Latin'] })

export default function RootLayout({ children }) {
  const [ queryClient ] = useState(() => new QueryClient())

  return (
    <html lang="en">
      <body className="inter.className">
        <QueryClientProvider client={queryClient}>
          { children }
        </QueryClientProvider>
      </body>
    </html>
  )
}