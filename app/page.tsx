import Header from '@/components/landing/Header'
import HeroSection from '@/components/landing/HeroSection'
import HowItWorksSection from '@/components/landing/HowItWorksSection'
import MarketplacesSection from '@/components/landing/MarketplacesSection'
import SuppliersSection from '../components/landing/SuppliersSection'
import AISection from '../components/landing/AISection'
import DashboardPreview from '../components/landing/DashboardPreview'
import PricingSection from '../components/landing/PricingSection'

export default function HomePage() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <Header />
      <HeroSection />
      <HowItWorksSection />
      <MarketplacesSection />
     <SuppliersSection /> 
     <AISection />
     <DashboardPreview />
     <PricingSection />
    </main>
  )
}