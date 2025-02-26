import type { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: 'Just app',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <>{children}</>
}
