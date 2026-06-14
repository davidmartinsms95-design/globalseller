import './globals.css'

import Providers from './providers'

import Script from 'next/script'

export const metadata = {
  title: 'GlobalSeller — Plataforma SaaS de Vendas',

  description:
    'Venda produtos digitais com dashboard premium, checkout PIX, analytics e monetização recorrente.',

  keywords: [
    'SaaS',
    'Plataforma de vendas',
    'Checkout PIX',
    'Mercado Pago',
    'Dashboard',
    'Vendas online',
  ],

  openGraph: {
    title:
      'GlobalSeller — Plataforma SaaS',

    description:
      'Dashboard premium, checkout PIX e monetização recorrente.',

    url: 'https://globalseller.vercel.app',

    siteName: 'GlobalSeller',

    locale: 'pt_BR',

    type: 'website',
  },
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

        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
          strategy="afterInteractive"
        />

        <Script id="google-analytics">
          {`
            window.dataLayer = window.dataLayer || [];

            function gtag(){
              dataLayer.push(arguments);
            }

            gtag('js', new Date());

            gtag('config', 'G-BZC9Z5V6NR');
          `}
        </Script>
      </body>
    </html>
  )
}