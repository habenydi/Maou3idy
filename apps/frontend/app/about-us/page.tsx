'use client';
import Navbar from '@/components/Navbar';

export default function AboutUs() {
  return (
    <div className="bg-surface text-on-surface">
      <Navbar activeLink="about" />

      <main className="pt-24 pb-12 max-w-screen-2xl mx-auto px-6">
        <section className="mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4">About Us</h1>
          <p className="text-lg text-on-surface-variant">
            Welcome to our healthcare platform! We are dedicated to connecting patients with top-rated doctors and specialists across various medical fields. Our mission is to provide easy access to quality healthcare services, ensuring that everyone can find the right care they need.
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-semibold tracking-tight mb-4">Our Mission</h2>
          <p className="text-lg text-on-surface-variant">
            Our mission is to improve healthcare accessibility and quality by leveraging technology to connect patients with qualified healthcare professionals. We strive to make the process of finding and booking appointments with doctors seamless and efficient.
          </p>
        </section>
      </main>
    </div>
  );
}