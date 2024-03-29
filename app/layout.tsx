import '@/app/ui/global.css'
import { inter } from '@/app/ui/fonts'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    template: '%s | Invoiceitor 3000',
    default: 'Invoiceitor 3000',
  },
  description: 'The best Invoice management tool of the year.',
  metadataBase: new URL('https://nextjs-14-app-seven.vercel.app/'),
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.className} antialiased`}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <meta property="og:title" content="Invoiceitor 3000" />
        <meta
          property="og:description"
          content="The best platform for invoices"
        />
        <meta property="og:image" content="../public/opengraph-image.png" />

        <meta name="keywords" content="invoices, invoiceitor, papaya" />
      </head>
      <body>{children}</body>
    </html>
  )
}
