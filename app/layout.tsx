import './globals.css'
import Providers from './providers'

export const metadata = {
  title: 'GlobalSeller',
  description: 'Seller Platform',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}