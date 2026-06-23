import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from '@react-email/components'

interface WelcomeEmailProps {
  name: string
}

export default function WelcomeEmail({
  name,
}: WelcomeEmailProps) {
  return (
    <Html>
      <Head />

      <Preview>
        Bem-vindo ao GlobalSeller 🚀
      </Preview>

      <Body
        style={{
          backgroundColor: '#09090b',
          fontFamily: 'Arial',
          padding: '40px 0',
        }}
      >
        <Container
          style={{
            backgroundColor: '#18181b',
            borderRadius: '24px',
            padding: '40px',
            maxWidth: '600px',
          }}
        >
          <Section>
            <Heading
              style={{
                color: '#f97316',
                fontSize: '40px',
                marginBottom: '10px',
              }}
            >
              GlobalSeller
            </Heading>

            <Text
              style={{
                color: '#ffffff',
                fontSize: '28px',
                fontWeight: 'bold',
              }}
            >
              Bem-vindo, {name} 🚀
            </Text>

            <Text
              style={{
                color: '#a1a1aa',
                fontSize: '18px',
                lineHeight: '30px',
              }}
            >
              Sua conta foi criada com sucesso.
              Agora você possui acesso à
              plataforma SaaS do GlobalSeller.
            </Text>

            <Text
              style={{
                color: '#a1a1aa',
                fontSize: '18px',
                lineHeight: '30px',
              }}
            >
              Venda produtos digitais,
              receba pagamentos via PIX,
              acompanhe analytics e escale
              seu negócio online.
            </Text>

            <Button
              href="https://globalseller.vercel.app/dashboard"
              style={{
                backgroundColor: '#f97316',
                color: '#ffffff',
                padding: '18px 32px',
                borderRadius: '16px',
                fontWeight: 'bold',
                fontSize: '18px',
                textDecoration: 'none',
                display: 'inline-block',
                marginTop: '20px',
              }}
            >
              Acessar Dashboard
            </Button>

            <Hr
              style={{
                borderColor: '#27272a',
                margin: '40px 0',
              }}
            />

            <Text
              style={{
                color: '#71717a',
                fontSize: '14px',
              }}
            >
              © 2026 GlobalSeller.
              Plataforma SaaS premium.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}
