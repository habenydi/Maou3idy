'use client';

import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import InformationFooter from '@/components/InformationFooter';

import HeroSection from './components/HeroSection';
import FeaturedDoctors from './components/FeaturedDoctors';
import HowItWorks from './components/HowItWorks';
import CTASection from './components/CTASection';
import LoadingScreen from './components/LoadingScreen';

import { getLandingPageData } from '@/services/landingPageService';
import { LandingPageData } from '@/types';

export default function LandingPage() {
  const [landingData, setLandingData] = useState<LandingPageData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getLandingPageData();
        setLandingData(data);
      } catch (error) {
        console.error('Error loading landing page:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <LoadingScreen />;

  return (
    <div className="bg-surface text-on-surface antialiased">
      <Navbar />

      <main className="pt-20">
        <HeroSection />
        <FeaturedDoctors doctors={landingData?.featuredDoctors || []} />
        <HowItWorks />
        <CTASection />
      </main>

      <InformationFooter />
    </div>
  );
}