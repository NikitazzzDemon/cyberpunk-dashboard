import './globals.css'
import React from 'react'

export const metadata = {
  title: 'Cyberpunk Dashboard',
  description: 'Futuristic secure software download platform',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="font-inter">{children}</body>
    </html>
  )
}
