"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showTop, setShowTop] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Simple scroll handler
  useEffect(() => {
    const onScroll = () => {
      setShowTop(window.scrollY > 80);
    };
    
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Handle form submission
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('success') === '1') {
      setSubmitted(true);
      const url = new URL(window.location.href);
      url.searchParams.delete('success');
      window.history.replaceState({}, '', url.toString());
    }
  }, []);

  // iOS video autoplay handling
  useEffect(() => {
    const video = document.querySelector('video') as HTMLVideoElement;
    if (!video) return;

    const playVideo = async () => {
      try {
        await video.play();
      } catch {
        console.log('Video autoplay prevented, will play on user interaction');
      }
    };

    playVideo();

    const handleUserInteraction = async () => {
      try {
        await video.play();
        document.removeEventListener('touchstart', handleUserInteraction);
        document.removeEventListener('click', handleUserInteraction);
      } catch {
        console.log('Video play failed');
      }
    };

    document.addEventListener('touchstart', handleUserInteraction, { passive: true, once: true });
    document.addEventListener('click', handleUserInteraction, { passive: true, once: true });

    return () => {
      document.removeEventListener('touchstart', handleUserInteraction);
      document.removeEventListener('click', handleUserInteraction);
    };
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className={`sticky top-0 z-50 border-b border-gray-200 header ${showTop ? 'header--scrolled' : ''}`}>
        <div className="section-container section-container--wide grid grid-cols-[auto_1fr_auto] items-center py-2 md:py-3">
          <div className="flex items-center gap-3">
            <div className="relative w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16">
              <Image
                src="/Penta Traders logo.png"
                alt="Penta Traders"
                fill
                className="rounded object-contain"
                sizes="(max-width: 640px) 56px, (max-width: 768px) 64px, 80px"
                priority
              />
            </div>
          </div>
          
          <nav className="hidden md:flex items-center justify-center gap-6 lg:gap-7 text-base lg:text-lg font-medium text-gray-800">
            <a href="#home" className="nav-link">Home</a>
            <a href="#about" className="nav-link">About</a>
            <a href="#products" className="nav-link">Products</a>
            <a href="#memberships" className="nav-link">Memberships</a>
          </nav>
          
          <div className="flex items-center justify-end gap-3">
            <div className="hidden md:block">
              <a href="#contact" className="btn-primary">Request a Quote</a>
            </div>
            <button
              type="button"
              aria-label="Open menu"
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((v) => !v)}
              className="md:hidden inline-flex items-center justify-center h-10 w-10 text-gray-800"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 5h16M4 9h16M4 13h16M4 17h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </div>
        
        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden border-t border-gray-200 mobile-menu">
            <div className="section-container py-3">
              <div className="flex flex-col gap-2 text-sm">
                <a onClick={() => setMobileOpen(false)} href="#home" className="py-2 text-gray-600">Home</a>
                <a onClick={() => setMobileOpen(false)} href="#about" className="py-2 text-gray-600">About</a>
                <a onClick={() => setMobileOpen(false)} href="#products" className="py-2 text-gray-600">Products</a>
                <a onClick={() => setMobileOpen(false)} href="#memberships" className="py-2 text-gray-600">Memberships</a>
                <a onClick={() => setMobileOpen(false)} href="#contact" className="mt-2 btn-primary w-full">Request a Quote</a>
              </div>
            </div>
          </div>
        )}
      </header>

      <main>
        {/* Hero Section */}
        <section id="home" className="relative pt-16 min-h-[70vh] lg:min-h-[90vh] overflow-hidden">
          {/* iOS-Optimized Video Background */}
          <div className="absolute inset-0">
            {/* Fallback gradient background */}
            <div className="absolute inset-0 hero-bg" />
            
            {/* Video - iOS optimized */}
            <video
              className="absolute inset-0 w-full h-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              style={{ 
                objectFit: 'cover',
                WebkitPlaysInline: true
              } as React.CSSProperties}
              onError={(e) => {
                // Hide video on error, show gradient background
                const video = e.target as HTMLVideoElement;
                video.style.display = 'none';
              }}
            >
              <source src="/banner video.mp4" type="video/mp4" />
            </video>
            
            {/* Gradient overlay for readability */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/50" />
          </div>
          
          {/* Content */}
          <div className="section-container py-24 lg:py-36 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="responsive-text font-bold leading-tight text-white">
                <span className="gradient-text block">Penta Traders</span>
                <span className="block">From Pakistan to the World</span>
              </h1>
              <p className="mt-5 text-base sm:text-lg text-white/90 max-w-2xl mx-auto">
                Delivering Pakistan&apos;s finest products to global markets with authenticity, quality, and reliability.
              </p>
              <div className="mt-7 flex flex-wrap gap-3 justify-center">
                <a href="#products" className="btn-primary">Explore Our Exports</a>
                <a href="#contact" className="btn-primary">Request a Quote</a>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-16 lg:py-24">
          <div className="section-container">
            <div className="max-w-7xl mx-auto">
              <div className="card rounded-3xl p-6 sm:p-10">
                <div className="grid lg:grid-cols-12 gap-10 items-start">
                  <div className="lg:col-span-7 space-y-6">
                    <p className="text-xs tracking-wider uppercase text-gray-500">About Us</p>
                    <h2 className="text-4xl sm:text-5xl font-bold leading-tight accent-underline">
                      Connecting Pakistan to Global Markets Since 2021
                    </h2>
                    <p className="text-gray-700 text-lg max-w-3xl">
                      Penta Traders is a registered export company headquartered in Lahore, Pakistan. Founded in 2021, we are dedicated to delivering authentic Pakistani products to global clients with a focus on quality, transparency, and timely delivery.
                    </p>
                    <p className="text-gray-600 max-w-3xl">
                      Since 2021, Penta Traders has been connecting Pakistan&apos;s heritage crafts, natural resources, and sustainable products to buyers worldwide. Based in Lahore, we are officially registered with the FBR and members of the LCCI and PCMEA.
                    </p>

                    <div className="mt-6 grid sm:grid-cols-3 gap-4">
                      {['On-time Delivery', 'Authentic Sourcing', 'Global Fulfillment'].map((label) => (
                        <div key={label} className="card rounded-2xl p-4 text-sm">
                          <span className="text-gray-700">{label}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="lg:col-span-5">
                    <div className="card rounded-3xl p-7">
                      <h3 className="font-semibold text-xl">Why Choose Us</h3>
                      <ul className="mt-5 space-y-3">
                        {[
                          "Registered with FBR",
                          "Member – Lahore Chamber of Commerce & Industry (LCCI)",
                          "Member – Pakistan Carpet Manufacturers & Exporters Association (PCMEA)",
                          "Strategic location in Lahore, Pakistan&apos;s trade hub",
                          "Trusted supplier network: artisans, manufacturers, and exporters",
                          "Commitment to ethical sourcing and sustainability",
                        ].map((item) => (
                          <li key={item} className="flex items-start gap-3">
                            <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-yellow-200">
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            </span>
                            <span className="text-gray-700">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Products Section */}
        <section id="products" className="py-16 lg:py-24">
          <div className="section-container">
            <div className="card rounded-3xl p-6 sm:p-10">
              <h2 className="text-2xl sm:text-3xl font-semibold">Our Export Portfolio</h2>
              <p className="mt-3 text-gray-600 max-w-3xl">
                At Penta Traders, we carefully source products that showcase the heritage, natural wealth, and craftsmanship of Pakistan. Our exports meet international quality standards and cater to diverse industries worldwide.
              </p>

              <div className="mt-8 grid md:grid-cols-3 gap-6">
                {/* Rugs */}
                <div className="card rounded-2xl overflow-hidden">
                  <div className="p-4 pb-3 flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-lg">Handmade Rugs</h3>
                      <p className="mt-1 text-gray-600">Persian-inspired, tribal, and modern designs with natural dyes.</p>
                    </div>
                    <span className="inline-flex items-center rounded-full px-3 py-1 text-xs bg-yellow-100">Heritage</span>
                  </div>
                  <div className="grid grid-cols-3 gap-1 px-4 pb-3">
                    <div className="relative aspect-square rounded-lg overflow-hidden">
                      <Image src="/rugs images/image 3.jpg" alt="Rug 1" fill className="object-cover" />
                    </div>
                    <div className="relative aspect-square rounded-lg overflow-hidden">
                      <Image src="/rugs images/image 4.jpg" alt="Rug 2" fill className="object-cover" />
                    </div>
                    <div className="relative aspect-square rounded-lg overflow-hidden">
                      <Image src="/rugs images/images (1).jfif" alt="Rug 3" fill className="object-cover" />
                    </div>
                  </div>
                  <ul className="px-4 pb-4 text-sm text-gray-600 divide-y divide-gray-100">
                    {[
                      "100% handmade craftsmanship",
                      "Heritage designs & patterns",
                      "Bulk orders & custom sizes available",
                    ].map((t) => (
                      <li key={t} className="flex items-start gap-2 py-2">
                        <span className="mt-0.5 inline-flex h-4 w-4 items-center justify-center rounded-full bg-yellow-200">
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </span>
                        <span>{t}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Himalayan Salt */}
                <div className="card rounded-2xl overflow-hidden">
                  <div className="p-4 pb-3 flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-lg">Himalayan Pink Salt Products</h3>
                      <p className="mt-1 text-gray-600">Lamps, tiles, and edible salt.</p>
                    </div>
                    <span className="inline-flex items-center rounded-full px-3 py-1 text-xs bg-yellow-100">Natural</span>
                  </div>
                  <div className="grid grid-cols-3 gap-1 px-4 pb-3">
                    <div className="relative aspect-square rounded-lg overflow-hidden">
                      <Image src="/himalyan salt images/Himalayan-Salt-Products.jpg" alt="Salt Products 1" fill className="object-cover" />
                    </div>
                    <div className="relative aspect-square rounded-lg overflow-hidden">
                      <Image src="/himalyan salt images/images (2).jfif" alt="Salt Products 2" fill className="object-cover" />
                    </div>
                    <div className="relative aspect-square rounded-lg overflow-hidden">
                      <Image src="/himalyan salt images/images.jfif" alt="Salt Products 3" fill className="object-cover" />
                    </div>
                  </div>
                  <ul className="px-4 pb-4 text-sm text-gray-600 divide-y divide-gray-100">
                    {[
                      "Salt lamps & candle holders",
                      "Cooking slabs & salt tiles",
                      "Edible salt (fine & coarse)",
                    ].map((t) => (
                      <li key={t} className="flex items-start gap-2 py-2">
                        <span className="mt-0.5 inline-flex h-4 w-4 items-center justify-center rounded-full bg-yellow-200">
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </span>
                        <span>{t}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Bamboo Baskets */}
                <div className="card rounded-2xl overflow-hidden">
                  <div className="p-4 pb-3 flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-lg">Bamboo Baskets</h3>
                      <p className="mt-1 text-gray-600">Eco-friendly and stylish.</p>
                    </div>
                    <span className="inline-flex items-center rounded-full px-3 py-1 text-xs bg-yellow-100">Sustainable</span>
                  </div>
                  <div className="grid grid-cols-3 gap-1 px-4 pb-3">
                    <div className="relative aspect-square rounded-lg overflow-hidden">
                      <Image src="/bamboo basktets/bamboo basktets 1.jfif" alt="Bamboo Basket 1" fill className="object-cover" />
                    </div>
                    <div className="relative aspect-square rounded-lg overflow-hidden">
                      <Image src="/bamboo basktets/image 2.jfif" alt="Bamboo Basket 2" fill className="object-cover" />
                    </div>
                    <div className="relative aspect-square rounded-lg overflow-hidden">
                      <Image src="/bamboo basktets/image 3.jfif" alt="Bamboo Basket 3" fill className="object-cover" />
                    </div>
                  </div>
                  <ul className="px-4 pb-4 text-sm text-gray-600 divide-y divide-gray-100">
                    {[
                      "100% natural bamboo",
                      "Durable, reusable, and decorative",
                      "Storage, utility, and decorative styles",
                    ].map((t) => (
                      <li key={t} className="flex items-start gap-2 py-2">
                        <span className="mt-0.5 inline-flex h-4 w-4 items-center justify-center rounded-full bg-yellow-200">
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </span>
                        <span>{t}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-10">
                <h3 className="font-semibold">Future Expansion Products</h3>
                <div className="mt-3 flex flex-wrap gap-2 text-sm">
                  {[
                    "Textiles & Apparel",
                    "Leather Goods",
                    "Sports Goods",
                    "Surgical Instruments",
                    "Agro Products (Rice, Spices, Dry Fruits)",
                  ].map((item) => (
                    <span key={item} className="card rounded-full px-3 py-1">{item}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Memberships Section */}
        <section id="memberships" className="py-16 lg:py-24">
          <div className="section-container">
            <h2 className="text-2xl sm:text-3xl font-semibold text-center">
              Our Recognition & Trade Memberships
            </h2>
            <p className="mt-3 text-gray-600 text-center">
              We are trusted by Pakistan&apos;s leading trade and commerce authorities.
            </p>

            <div className="mt-8 grid grid-cols-3 gap-4">
              {/* FBR */}
              <div className="card rounded-2xl p-4 flex flex-col items-center justify-center text-center">
                <div className="relative w-20 h-12 sm:w-32 sm:h-20">
                  <Image
                    src="/membership logo/fbr logo.jpg"
                    alt="FBR Registered"
                    fill
                    className="object-contain"
                  />
                </div>
                <p className="mt-3 text-sm">FBR Registered</p>
              </div>

              {/* LCCI */}
              <div className="card rounded-2xl p-4 flex flex-col items-center justify-center text-center">
                <div className="relative w-20 h-12 sm:w-32 sm:h-20">
                  <Image
                    src="/membership logo/lahore chamber logo.jpg"
                    alt="Lahore Chamber of Commerce & Industry (LCCI)"
                    fill
                    className="object-contain"
                  />
                </div>
                <p className="mt-3 text-sm">Member – LCCI</p>
              </div>

              {/* PCMEA */}
              <div className="card rounded-2xl p-4 flex flex-col items-center justify-center text-center">
                <div className="relative w-20 h-12 sm:w-32 sm:h-20">
                  <Image
                    src="/membership logo/pcmea carpet pakistan.jpg"
                    alt="Pakistan Carpet Manufacturers & Exporters Association (PCMEA)"
                    fill
                    className="object-contain"
                  />
                </div>
                <p className="mt-3 text-sm">Member – PCMEA</p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-16 lg:py-24">
          <div className="section-container">
            <div className="max-w-5xl mx-auto">
              <form action="https://api.web3forms.com/submit" method="POST" className="card rounded-2xl p-6 space-y-6">
                {submitted && (
                  <div className="mb-2 rounded-lg border border-green-200 bg-green-50 px-3 py-2 text-sm text-green-800">
                    Thank you! Your inquiry has been sent. We&apos;ll get back to you soon.
                  </div>
                )}
                <input type="hidden" name="access_key" value="5a44e3e2-3214-4181-bfd7-bf04447a5e53" />
                <input type="hidden" name="subject" value="New Inquiry – Penta Traders" />
                <input type="hidden" name="from_name" value="Penta Traders Website" />
                <input type="hidden" name="redirect" value="/?success=1#contact" />
                <input type="checkbox" name="botcheck" className="hidden" />
                
                <div>
                  <label className="text-sm font-medium">Full Name</label>
                  <input name="name" type="text" required className="mt-2 w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500" />
                </div>
                <div>
                  <label className="text-sm font-medium">Email Address</label>
                  <input name="email" type="email" required className="mt-2 w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500" />
                </div>
                <div>
                  <label className="text-sm font-medium">Company / Business Name</label>
                  <input name="company" type="text" className="mt-2 w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500" />
                </div>
                <div>
                  <label className="text-sm font-medium">Country</label>
                  <input name="country" type="text" className="mt-2 w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500" />
                </div>
                <div>
                  <label className="text-sm font-medium">Product Inquiry / Message</label>
                  <textarea name="message" rows={5} required className="mt-2 w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500" />
                </div>
                <button type="submit" className="btn-primary w-full">Send Inquiry</button>
                <p className="text-xs text-gray-500">We usually respond within 1–2 business days.</p>
              </form>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-gray-50">
        <div className="section-container py-12">
          <div className="grid gap-10 md:grid-cols-3 text-sm text-gray-600">
            {/* Company */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="relative h-12 w-12 rounded overflow-hidden">
                  <Image src="/Penta Traders logo.png" alt="Penta Traders" fill className="object-contain" />
                </div>
              </div>
              <p className="text-gray-500 max-w-sm">Trusted exporter from Pakistan. Authentic products, professional service, and global reach.</p>
              <div className="flex items-center gap-3">
                <a aria-label="Email" href="mailto:abdullah.basharat@hotmail.com" className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 hover:bg-gray-100 transition">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 6h16v12H4z" stroke="currentColor" strokeWidth="1.5"/>
                    <path d="M4 7l8 6 8-6" stroke="currentColor" strokeWidth="1.5"/>
                  </svg>
                </a>
                <a aria-label="Facebook" href="https://www.facebook.com/official.pentatraders" target="_blank" rel="noopener noreferrer" className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 hover:bg-gray-100 transition">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22 12.06C22 6.49 17.52 2 12 2S2 6.49 2 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H8.08v-2.9h2.36V9.41c0-2.33 1.39-3.62 3.52-3.62c1.02 0 2.08.18 2.08.18v2.3h-1.17c-1.15 0-1.5.72-1.5 1.47v1.77h2.56l-.41 2.9h-2.15V22c4.78-.76 8.44-4.92 8.44-9.94Z" stroke="currentColor" strokeWidth="1.5"/>
                  </svg>
                </a>
                <a aria-label="Instagram" href="https://www.instagram.com/pentatraders" target="_blank" rel="noopener noreferrer" className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 hover:bg-gray-100 transition">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.5"/>
                    <path d="M16.5 7.5h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Contact */}
            <div className="space-y-3">
              <h4 className="font-semibold accent-underline inline-block">Contact</h4>
              <p>Address: 2nd Floor, 27/10, Empress Road, Behind PSO Pump, Lahore, Pakistan</p>
              <p>
                Email: <a className="underline" href="mailto:abdullah.basharat@hotmail.com">pentatraders@hotmail.com</a>
              </p>
            </div>

            {/* Links */}
            <div className="space-y-3 md:text-right">
              <div className="flex flex-wrap gap-x-5 gap-y-2 md:justify-end text-gray-600">
                <a href="#home" className="hover:text-yellow-600">Home</a>
                <a href="#about" className="hover:text-yellow-600">About</a>
                <a href="#products" className="hover:text-yellow-600">Products</a>
                <a href="#memberships" className="hover:text-yellow-600">Memberships</a>
                <a href="#contact" className="hover:text-yellow-600">Contact</a>
              </div>
            </div>
          </div>
          <div className="mt-10 pt-6 border-t border-gray-200 text-sm text-gray-500 flex items-center justify-between">
            <span>© {new Date().getFullYear()} Penta Traders. All rights reserved.</span>
          </div>
        </div>
      </footer>

      {/* Scroll to top button */}
      {showTop && (
        <button
          type="button"
          aria-label="Scroll to top"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed right-4 bottom-4 h-12 w-12 z-50 rounded-full shadow-lg transition focus-brand inline-flex items-center justify-center bg-yellow-500 text-black"
        >
          <svg className="block" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 15l6-6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      )}
    </div>
  );
}
