import '@/app/ui/global.css'
import { inter } from '@/app/ui/fonts'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.className} antialiased`}>
      <head>
        <title>My React Page</title>
        <link rel="icon" type="image/x-icon" href="../public/favicon.ico" />
      </head>
      <body>{children}</body>
    </html>
  )
}
