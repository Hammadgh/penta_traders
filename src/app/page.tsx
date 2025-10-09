"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showTop, setShowTop] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  useEffect(() => {
    // iOS-optimized scroll handler
    let lastKnownScrollY = 0;
    let ticking = false;
    let rafId: number | null = null;
    
    const onScroll = () => {
      lastKnownScrollY = window.scrollY || document.documentElement.scrollTop || 0;
      
      if (!ticking) {
        rafId = window.requestAnimationFrame(() => {
          setShowTop(lastKnownScrollY > 80);
          ticking = false;
          rafId = null;
        });
        
        ticking = true;
      }
    };
    
    // Initial check with delay for iOS
    setTimeout(() => {
      setShowTop((window.scrollY || document.documentElement.scrollTop || 0) > 80);
    }, 100);
    
    // Add event with passive option for better iOS performance
    window.addEventListener("scroll", onScroll, { passive: true });
    
    // Clean up
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafId) {
        window.cancelAnimationFrame(rafId);
      }
    };
  }, []);
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    if (params.get('success') === '1') {
      setSubmitted(true);
      // Optionally clear the flag from URL without reload
      const url = new URL(window.location.href);
      url.searchParams.delete('success');
      window.history.replaceState({}, '', url.toString());
    }
  }, []);

  // iOS video handling - optimized to prevent crashes
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    // Detect iOS first
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) || 
                  (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);

    const video = document.getElementById('banner-video') as HTMLVideoElement;
    const fallback = document.getElementById('video-fallback') as HTMLDivElement;
    const playButton = document.getElementById('play-button-overlay') as HTMLDivElement;
    
    if (!video) return;

    // On iOS, show fallback immediately to prevent crash from video loading
    if (isIOS && fallback) {
      fallback.style.display = 'block';
      // Don't load video automatically on iOS to prevent memory crash
      video.style.display = 'none';
      
      // Only load video on user interaction
      const enableVideoOnIOS = () => {
        if (playButton) playButton.style.display = 'flex';
      };
      
      setTimeout(enableVideoOnIOS, 500);
      return;
    }

    // Non-iOS devices: standard video handling
    video.setAttribute('webkit-playsinline', 'true');
    video.setAttribute('playsinline', 'true');
    video.muted = true;
    video.loop = true;

    const playVideo = () => {
      video.play().catch((e) => {
        console.log('Video autoplay prevented:', e);
        if (fallback) fallback.style.display = 'block';
      });
    };

    // Try to play after a short delay
    setTimeout(playVideo, 100);

    video.addEventListener('error', () => {
      console.log('Video failed to load');
      if (fallback) fallback.style.display = 'block';
      video.style.display = 'none';
    }, { once: true });

    return () => {
      // Cleanup
      video.pause();
    };
  }, []);
  useEffect(() => {
    // iOS-optimized active nav highlight with throttling
    const sectionIds = ["home", "about", "products", "memberships", "contact"];
    let isThrottled = false;
    let timeoutId: number | null = null;
    let rafId: number | null = null;
    
    const updateActiveNav = (current: string) => {
      // Use direct DOM manipulation instead of querySelectorAll for better iOS performance
      const navLinks = document.getElementsByClassName('nav-link');
      for (let i = 0; i < navLinks.length; i++) {
        navLinks[i].classList.remove('nav-link--active');
      }
      
      const activeLink = document.querySelector(`a[href="#${current}"]`);
      if (activeLink) {
        activeLink.classList.add('nav-link--active');
      }
    };
    
    const onScrollActive = () => {
      // Skip if already processing a scroll event
      if (isThrottled) return;
      
      isThrottled = true;
      
      // Use requestAnimationFrame for better iOS performance
      rafId = window.requestAnimationFrame(() => {
        const scrollY = (window.scrollY || document.documentElement.scrollTop || 0) + 120;
        let current = "home";
        
        // Find current section
        for (const id of sectionIds) {
          const el = document.getElementById(id);
          if (el && el.offsetTop <= scrollY) {
            current = id;
          }
        }
        
        updateActiveNav(current);
        
        // Reset throttle after 150ms for iOS
        timeoutId = window.setTimeout(() => {
          isThrottled = false;
        }, 150);
        
        rafId = null;
      });
    };
    
    // Initial call with delay for iOS
    setTimeout(onScrollActive, 200);
    
    // Event listener with passive option for iOS
    window.addEventListener("scroll", onScrollActive, { passive: true });
    
    // Clean up
    return () => {
      window.removeEventListener("scroll", onScrollActive);
      if (timeoutId) clearTimeout(timeoutId);
      if (rafId) window.cancelAnimationFrame(rafId);
    };
  }, []);
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-white to-[color-mix(in_oklab,_var(--brand-primary)_10%,_transparent)] bg-pattern">
      {/* Navbar */}
      <header className={`sticky top-0 z-50 border-b border-black/10 header ${showTop ? 'header--scrolled' : ''}`}>
        <div className="section-container section-container--wide grid [grid-template-columns:auto_1fr_auto] items-center py-1 md:py-2">
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
          <nav className="hidden md:flex items-center justify-center gap-6 lg:gap-7 text-base lg:text-lg font-medium text-[#023047]">
            <a href="#home" className="nav-link hover:text-[var(--brand-primary)]">Home</a>
            <a href="#about" className="nav-link hover:text-[var(--brand-primary)]">About</a>
            <a href="#products" className="nav-link hover:text-[var(--brand-primary)]">Products</a>
            <a href="#memberships" className="nav-link hover:text-[var(--brand-primary)]">Memberships</a>
          </nav>
          <div className="flex items-center justify-end gap-3 justify-self-end">
            <div className="hidden md:block">
              <a href="#contact" className="btn-primary">Request a Quote</a>
            </div>
            <button
            type="button"
            aria-label="Open menu"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
            className="md:hidden inline-flex items-center justify-center h-10 w-10 text-[#023047] transition"
          >
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 5h16M4 9h16M4 13h16M4 17h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
            </button>
          </div>
        </div>
        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden border-t border-black/10 bg-white/95 backdrop-blur-sm">
            <div className="section-container py-3">
              <div className="flex flex-col gap-2 text-sm">
                <a onClick={() => setMobileOpen(false)} href="#home" className="py-2 text-[#4A626C] hover:text-[var(--brand-primary)]">Home</a>
                <a onClick={() => setMobileOpen(false)} href="#about" className="py-2 text-[#4A626C] hover:text-[var(--brand-primary)]">About</a>
                <a onClick={() => setMobileOpen(false)} href="#products" className="py-2 text-[#4A626C] hover:text-[var(--brand-primary)]">Products</a>
                <a onClick={() => setMobileOpen(false)} href="#memberships" className="py-2 text-[#4A626C] hover:text-[var(--brand-primary)]">Memberships</a>
                <a onClick={() => setMobileOpen(false)} href="#contact" className="mt-2 btn-primary w-full">Request a Quote</a>
              </div>
            </div>
          </div>
        )}
      </header>

      <main>
        {/* Hero */}
        <section id="home" className="relative pt-16 min-h-[70vh] lg:min-h-[92vh] scroll-mt-24 lg:scroll-mt-32">
          {/* Background video with iOS compatibility */}
          <div className="absolute inset-0 overflow-hidden">
            {/* iOS-optimized video implementation */}
            <video
              muted
              loop
              playsInline
              preload="none"
              {...{ "webkit-playsinline": "true" }}
              className="w-full h-full object-cover"
              id="banner-video"
              style={{ 
                objectFit: "cover"
              } as React.CSSProperties}
            >
  <source src="/banner%20video.mp4" type="video/mp4" />
  Your browser does not support the video tag.
</video>



            
            {/* Fallback background for iOS when video fails */}
            <div 
              className="absolute inset-0 bg-gradient-to-br from-[#023047] via-[#1a4a5c] to-[#023047]"
              style={{ display: 'none' }}
              id="video-fallback"
            />
            
            {/* iOS Play Button Overlay */}
            <div 
              className="absolute inset-0 flex items-center justify-center z-20"
              id="play-button-overlay"
              style={{ display: 'none' }}
            >
              <button
                onClick={async () => {
                  const video = document.getElementById('banner-video') as HTMLVideoElement;
                  const overlay = document.getElementById('play-button-overlay') as HTMLDivElement;
                  const fallback = document.getElementById('video-fallback') as HTMLDivElement;
                  
                  if (video) {
                    try {
                      // Show video element
                      video.style.display = 'block';
                      // Load and play video
                      video.load();
                      await video.play();
                      // Hide overlay and fallback on success
                      if (overlay) overlay.style.display = 'none';
                      if (fallback) fallback.style.display = 'none';
                    } catch (error) {
                      console.error('Failed to play video:', error);
                      // Keep fallback visible on error
                      video.style.display = 'none';
                      if (overlay) overlay.style.display = 'none';
                    }
                  }
                }}
                className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-full p-6 hover:bg-white/30 transition-all duration-300 hover:scale-110"
                aria-label="Play video"
              >
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 5v14l11-7z" fill="white" />
                </svg>
              </button>
            </div>
          </div>
          {/* Overlay for readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/50" />
          {/* Animated blobs */}
          <div className="absolute inset-0">
            <div className="hero-blob left-10 top-16 w-64 h-64 rounded-full" style={{ background: 'radial-gradient(closest-side, var(--brand-primary), transparent)' }} />
            <div className="hero-blob right-16 bottom-10 w-72 h-72 rounded-full" style={{ background: 'radial-gradient(closest-side, color-mix(in oklab, var(--brand-primary) 60%, #fff), transparent)', animationDelay: '2s' }} />
          </div>

          <div className="section-container py-24 lg:py-36 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-[clamp(22px,6.5vw,48px)] sm:text-[clamp(28px,5.5vw,64px)] font-bold leading-tight text-white">
                <span className="gradient-text block whitespace-nowrap">Penta Traders </span>
                <span className="block whitespace-nowrap">From Pakistan to the World</span>
              </h1>
              <p className="mt-5 text-base sm:text-lg text-white/85 max-w-2xl mx-auto">
                Delivering Pakistan’s finest products to global markets with authenticity, quality, and reliability.
              </p>
              <div className="mt-7 flex flex-wrap gap-3 justify-center">
                <a href="#products" className="btn-primary" style={{ background: 'var(--brand-primary)', color: '#000' }}>Explore Our Exports</a>
                <a href="#contact" className="btn-primary">Request a Quote</a>
              </div>
              
              
            </div>
          </div>
        </section>

        {/* About */}
        <section id="about" className="py-44 scroll-mt-24 lg:scroll-mt-32">
          <div className="section-container">
            <div className="mx-auto max-w-7xl">
            <div className="rounded-3xl border border-black/5 bg-white/60 backdrop-blur p-6 sm:p-10 card-hover">
              <div className="grid lg:grid-cols-12 gap-10 items-start">
                {/* Left column expanded */}
                <div className="lg:col-span-7 space-y-6 reveal">
                  <p className="text-xs tracking-wider uppercase text-foreground/60">About Us</p>
                  <h2 className="mt-1 text-4xl sm:text-5xl font-bold leading-tight accent-underline">
                    Connecting Pakistan to Global Markets Since 2021
                  </h2>
                  <p className="mt-4 text-foreground/80 text-lg max-w-3xl">
                    Penta Traders is a registered export company headquartered in Lahore, Pakistan. Founded in 2021, we are dedicated to delivering authentic Pakistani products to global clients with a focus on quality, transparency, and timely delivery.
                  </p>
                  <p className="text-foreground/70 max-w-3xl">
                    Since 2021, Penta Traders has been connecting Pakistan’s heritage crafts, natural resources, and sustainable products to buyers worldwide. Based in Lahore, we are officially registered with the FBR and members of the LCCI and PCMEA.
                  </p>

                  {/* Highlight strip */}
                  <div className="mt-6 grid sm:grid-cols-3 gap-4">
                    {[
                      'On-time Delivery',
                      'Authentic Sourcing',
                      'Global Fulfillment',
                    ].map((label, i) => (
                      <div key={label} className={`glass rounded-2xl p-4 text-sm hover-lift reveal delay-${i+1}`}>
                        <span className="text-foreground/80">{label}</span>
                      </div>
                    ))}
                  </div>

                  
                </div>

                {/* Right column larger checklist with animation */}
                <div className="lg:col-span-5 reveal delay-2">
                  <div className="glass rounded-3xl p-7 hover-lift">
                    <h3 className="font-semibold text-xl">Why Choose Us</h3>
                    <ul className="mt-5 space-y-0">
                      {[
                        "Registered with FBR ",
                        "Member – Lahore Chamber of Commerce & Industry (LCCI)",
                        "Member – Pakistan Carpet Manufacturers & Exporters Association (PCMEA)",
                        "Strategic location in Lahore, Pakistan’s trade hub",
                        "Trusted supplier network: artisans, manufacturers, and exporters",
                        "Commitment to ethical sourcing and sustainability",
                      ].map((item, idx) => (
                        <li key={item} className="flex items-start gap-3 reveal border-b border-black/5 last:border-0 py-3" style={{ animationDelay: `${120 + idx * 90}ms` }}>
                          <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full" style={{ background: "color-mix(in oklab, var(--brand-primary) 28%, transparent)" }}>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                          </span>
                          <span className="text-foreground/80">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              </div>

              {/* Extended media + narrative band to increase section length */}
              <div className="mt-14 grid lg:grid-cols-12 gap-8 items-stretch">
                <div className="lg:col-span-7 reveal">
                  <div className="relative h-64 sm:h-80 rounded-3xl overflow-hidden hover-lift">
                    <Image
                      src="/rugs images/image 4.jpg"
                      alt="Pakistan craftsmanship montage"
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 70vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
                  </div>
                </div>
                <div className="lg:col-span-5 flex">
                  <div className="glass rounded-3xl p-7 flex flex-col justify-center reveal delay-1">
                    <h3 className="font-semibold text-xl">Our Story</h3>
                    <p className="mt-3 text-foreground/75">
                      We partner directly with artisans and certified manufacturers across Pakistan. From the
                      Himalayan ranges to the bustling markets of Lahore, our network enables us to source
                      responsibly and deliver reliably—at scale—while preserving the authenticity that buyers
                      value. Every shipment carries a commitment to quality and a promise of professional service.
                    </p>
                    <div className="mt-5 grid grid-cols-3 gap-3 text-center">
                      <div className="glass rounded-2xl p-4"><p className="text-2xl font-bold" style={{color: 'var(--brand-primary)'}}>25+</p><p className="text-xs text-foreground/70">Countries</p></div>
                      <div className="glass rounded-2xl p-4"><p className="text-2xl font-bold" style={{color: 'var(--brand-primary)'}}>150+</p><p className="text-xs text-foreground/70">Clients</p></div>
                      <div className="glass rounded-2xl p-4"><p className="text-2xl font-bold" style={{color: 'var(--brand-primary)'}}>2021</p><p className="text-xs text-foreground/70">Since</p></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mission & Vision - full width row */}
          <div className="section-container mt-12">
            <div className="rounded-3xl border border-black/5 bg-[color-mix(in_oklab,_var(--brand-primary)_6%,_white)] p-6 sm:p-10">
            <div className="grid sm:grid-cols-2 gap-5">
              <div className="glass rounded-2xl p-6 hover-lift reveal delay-1">
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-full" style={{ background: "color-mix(in oklab, var(--brand-primary) 25%, transparent)" }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2v3M12 19v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M2 12h3M19 12h3M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12M8 12a4 4 0 1 0 8 0a4 4 0 0 0-8 0Z" stroke="currentColor" strokeWidth="1.5"/></svg>
                  </span>
                  <h3 className="font-semibold text-lg">Mission</h3>
                </div>
                <p className="mt-3 text-foreground/70">To represent Pakistan’s craftsmanship, natural resources, and innovation in the global marketplace while building long-term trade partnerships based on trust.</p>
              </div>
              <div className="glass rounded-2xl p-6 hover-lift reveal delay-2">
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-full" style={{ background: "color-mix(in oklab, var(--brand-primary) 25%, transparent)" }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2l1.8 5.2L19 9l-5.2 1.8L12 16l-1.8-5.2L5 9l5.2-1.8L12 2Z" stroke="currentColor" strokeWidth="1.5"/></svg>
                  </span>
                  <h3 className="font-semibold text-lg">Vision</h3>
                </div>
                <p className="mt-3 text-foreground/70">To become a leading exporter from Pakistan recognized for authentic products, professional services, and global market reach.</p>
              </div>
            </div>
            </div>
          </div>
        </section>

        {/* Products */}
        <section id="products" className="section-container py-16 scroll-mt-24 lg:scroll-mt-32">
          <div className="rounded-3xl border border-black/5 bg-white/60 backdrop-blur p-6 sm:p-10">
          <h2 className="text-2xl sm:text-3xl font-semibold">Our Export Portfolio</h2>
          <p className="mt-3 text-foreground/80 max-w-3xl">At Penta Traders, we carefully source products that showcase the heritage, natural wealth, and craftsmanship of Pakistan. Our exports meet international quality standards and cater to diverse industries worldwide.</p>

          <div className="mt-8 grid md:grid-cols-3 gap-4">
            {/* Rugs */}
            <div className="glass rounded-2xl overflow-hidden card-hover">
              <div className="p-4 pb-3 flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-lg">Handmade Rugs</h3>
                  <p className="mt-1 text-foreground/70">Persian-inspired, tribal, and modern designs with natural dyes.</p>
                </div>
                <span className="inline-flex items-center rounded-full px-3 py-1 text-xs" style={{ background: "color-mix(in oklab, var(--brand-primary) 18%, transparent)" }}>Heritage</span>
              </div>
              <div className="grid grid-cols-3 gap-1 px-4 pb-3">
                <div className="relative aspect-square rounded-lg overflow-hidden">
                  <Image src="/rugs images/image 3.jpg" alt="Rug 1" fill className="object-cover hover:scale-105 transition duration-300" />
                </div>
                <div className="relative aspect-square rounded-lg overflow-hidden">
                  <Image src="/rugs images/image 4.jpg" alt="Rug 2" fill className="object-cover hover:scale-105 transition duration-300" />
                </div>
                <div className="relative aspect-square rounded-lg overflow-hidden">
                  <Image src="/rugs images/images (1).jfif" alt="Rug 3" fill className="object-cover hover:scale-105 transition duration-300" />
                </div>
              </div>
              <ul className="px-4 pb-4 text-sm text-foreground/80 divide-y divide-black/5">
                {[
                  "100% handmade craftsmanship",
                  "Heritage designs & patterns",
                  "Bulk orders & custom sizes available",
                ].map((t) => (
                  <li key={t} className="flex items-start gap-2 py-2">
                    <span className="mt-0.5 inline-flex h-4 w-4 items-center justify-center rounded-full" style={{ background: "color-mix(in oklab, var(--brand-primary) 28%, transparent)" }}>
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </span>
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Himalayan Salt */}
            <div className="glass rounded-2xl overflow-hidden card-hover">
              <div className="p-4 pb-3 flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-lg">Himalayan Pink Salt Products</h3>
                  <p className="mt-1 text-foreground/70">Lamps, tiles, and edible salt.</p>
                </div>
                <span className="inline-flex items-center rounded-full px-3 py-1 text-xs" style={{ background: "color-mix(in oklab, var(--brand-primary) 18%, transparent)" }}>Natural</span>
              </div>
              <div className="grid grid-cols-3 gap-1 px-4 pb-3">
                <div className="relative aspect-square rounded-lg overflow-hidden">
                  <Image src="/himalyan salt images/Himalayan-Salt-Products.jpg" alt="Salt Products 1" fill className="object-cover hover:scale-105 transition duration-300" />
                </div>
                <div className="relative aspect-square rounded-lg overflow-hidden">
                  <Image src="/himalyan salt images/images (2).jfif" alt="Salt Products 2" fill className="object-cover hover:scale-105 transition duration-300" />
                </div>
                <div className="relative aspect-square rounded-lg overflow-hidden">
                  <Image src="/himalyan salt images/images.jfif" alt="Salt Products 3" fill className="object-cover hover:scale-105 transition duration-300" />
                </div>
              </div>
              <ul className="px-4 pb-4 text-sm text-foreground/80 divide-y divide-black/5">
                {[
                  "Salt lamps & candle holders",
                  "Cooking slabs & salt tiles",
                  "Edible salt (fine & coarse)",
                ].map((t) => (
                  <li key={t} className="flex items-start gap-2 py-2">
                    <span className="mt-0.5 inline-flex h-4 w-4 items-center justify-center rounded-full" style={{ background: "color-mix(in oklab, var(--brand-primary) 28%, transparent)" }}>
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </span>
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Bamboo Baskets */}
            <div className="glass rounded-2xl overflow-hidden card-hover">
              <div className="p-4 pb-3 flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-lg">Bamboo Baskets</h3>
                  <p className="mt-1 text-foreground/70">Eco-friendly and stylish.</p>
                </div>
                <span className="inline-flex items-center rounded-full px-3 py-1 text-xs" style={{ background: "color-mix(in oklab, var(--brand-primary) 18%, transparent)" }}>Sustainable</span>
              </div>
              <div className="grid grid-cols-3 gap-1 px-4 pb-3">
                <div className="relative aspect-square rounded-lg overflow-hidden">
                  <Image src="/bamboo basktets/bamboo basktets 1.jfif" alt="Bamboo Basket 1" fill className="object-cover hover:scale-105 transition duration-300" />
                </div>
                <div className="relative aspect-square rounded-lg overflow-hidden">
                  <Image src="/bamboo basktets/image 2.jfif" alt="Bamboo Basket 2" fill className="object-cover hover:scale-105 transition duration-300" />
                </div>
                <div className="relative aspect-square rounded-lg overflow-hidden">
                  <Image src="/bamboo basktets/image 3.jfif" alt="Bamboo Basket 3" fill className="object-cover hover:scale-105 transition duration-300" />
                </div>
              </div>
              <ul className="px-4 pb-4 text-sm text-foreground/80 divide-y divide-black/5">
                {[
                  "100% natural bamboo",
                  "Durable, reusable, and decorative",
                  "Storage, utility, and decorative styles",
                ].map((t) => (
                  <li key={t} className="flex items-start gap-2 py-2">
                    <span className="mt-0.5 inline-flex h-4 w-4 items-center justify-center rounded-full" style={{ background: "color-mix(in oklab, var(--brand-primary) 28%, transparent)" }}>
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
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
                <span key={item} className="glass rounded-full px-3 py-1 hover-lift">{item}</span>
              ))}
            </div>
          </div>
          </div>
        </section>

        {/* Memberships */}
<section id="memberships" className="section-container py-16 scroll-mt-24 lg:scroll-mt-32">
  <h2 className="text-2xl sm:text-3xl font-semibold text-center">
    Our Recognition & Trade Memberships
  </h2>
  <p className="mt-3 text-foreground/70 text-center">
    We are trusted by Pakistan’s leading trade and commerce authorities.
  </p>

  <div className="mt-8 grid grid-cols-3 gap-4">
    {/* FBR */}
    <div className="glass rounded-2xl p-4 flex flex-col items-center justify-center text-center hover:shadow-xl transition aspect-square sm:aspect-auto">
      <div className="relative w-20 h-12 sm:w-32 sm:h-20">
        <Image
          src="/membership%20logo/fbr%20logo.jpg"
          alt="FBR Registered"
          fill
          className="object-contain"
        />
      </div>
      <p className="mt-3 text-sm">FBR Registered</p>
    </div>

    {/* LCCI */}
    <div className="glass rounded-2xl p-4 flex flex-col items-center justify-center text-center hover:shadow-xl transition aspect-square sm:aspect-auto">
      <div className="relative w-20 h-12 sm:w-32 sm:h-20">
        <Image
          src="/membership%20logo/lahore%20chamber%20logo.jpg"
          alt="Lahore Chamber of Commerce & Industry (LCCI)"
          fill
          className="object-contain"
        />
      </div>
      <p className="mt-3 text-sm">Member – LCCI</p>
    </div>

    {/* PCMEA */}
    <div className="glass rounded-2xl p-4 flex flex-col items-center justify-center text-center hover:shadow-xl transition aspect-square sm:aspect-auto">
      <div className="relative w-20 h-12 sm:w-32 sm:h-20">
        <Image
          src="/membership%20logo/pcmea%20carpet%20pakistan.jpg"
          alt="Pakistan Carpet Manufacturers & Exporters Association (PCMEA)"
          fill
          className="object-contain"
        />
      </div>
      <p className="mt-3 text-sm">Member – PCMEA</p>
    </div>
  </div>
</section>


        {/* Contact */}
        <section id="contact" className="section-container section-container--wide py-16 scroll-mt-24 lg:scroll-mt-32">
          <div className="max-w-5xl mx-auto">
            <form action="https://api.web3forms.com/submit" method="POST" className="rounded-2xl p-6 space-y-6 bg-transparent">
              {submitted && (
                <div className="mb-2 rounded-lg border border-black/10 bg-white/70 px-3 py-2 text-sm text-foreground/80">
                  Thank you! Your inquiry has been sent. We’ll get back to you soon.
                </div>
              )}
              <input type="hidden" name="access_key" value="5a44e3e2-3214-4181-bfd7-bf04447a5e53" />
              <input type="hidden" name="subject" value="New Inquiry – Penta Traders" />
              <input type="hidden" name="from_name" value="Penta Traders Website" />
              <input type="hidden" name="redirect" value="/?success=1#contact" />
              <input type="checkbox" name="botcheck" className="hidden" style={{ display: 'none' }} />
              <div>
                <label className="text-sm font-medium">Full Name</label>
                <input name="name" type="text" required className="mt-2 w-full border-0 border-b border-black/20 bg-transparent px-0 py-3 focus:outline-none focus:ring-0 focus:border-black/50" />
              </div>
              <div>
                <label className="text-sm font-medium">Email Address</label>
                <input name="email" type="email" required className="mt-2 w-full border-0 border-b border-black/20 bg-transparent px-0 py-3 focus:outline-none focus:ring-0 focus:border-black/50" />
              </div>
              <div>
                <label className="text-sm font-medium">Company / Business Name</label>
                <input name="company" type="text" className="mt-2 w-full border-0 border-b border-black/20 bg-transparent px-0 py-3 focus:outline-none focus:ring-0 focus:border-black/50" />
              </div>
              <div>
                <label className="text-sm font-medium">Country</label>
                <input name="country" type="text" className="mt-2 w-full border-0 border-b border-black/20 bg-transparent px-0 py-3 focus:outline-none focus:ring-0 focus:border-black/50" />
              </div>
              <div>
                <label className="text-sm font-medium">Product Inquiry / Message</label>
                <textarea name="message" rows={5} required className="mt-2 w-full border-0 border-b border-black/20 bg-transparent px-0 py-3 focus:outline-none focus:ring-0 focus:border-black/50" />
              </div>
              <button type="submit" className="btn-primary w-full">Send Inquiry</button>
              <p className="text-xs text-foreground/60">We usually respond within 1–2 business days.</p>
              
            </form>
          </div>
        </section>
      </main>

      <footer className="border-t border-black/5 dark:border-white/10 bg-[color-mix(in_oklab,_var(--brand-primary)_6%,_white)]">
        <div className="section-container py-12">
          <div className="grid gap-10 md:grid-cols-3 text-sm text-foreground/80">
            {/* Company */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="relative h-15 w-15 rounded overflow-hidden">
                  <Image src="/Penta Traders logo.png" alt="Penta Traders" fill className="object-contain" />
                </div>
                
              </div>
              <p className="text-foreground/70 max-w-sm">Trusted exporter from Pakistan. Authentic products, professional service, and global reach.</p>
              <div className="flex items-center gap-3">
                <a aria-label="Email" href="mailto:abdullah.basharat@hotmail.com" className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-black/10 hover:bg-black/5 transition">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 6h16v12H4z" stroke="currentColor" strokeWidth="1.5"/><path d="M4 7l8 6 8-6" stroke="currentColor" strokeWidth="1.5"/></svg>
                </a>
                <a aria-label="Facebook" href="https://www.facebook.com/official.pentatraders" target="_blank" rel="noopener noreferrer" className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-black/10 hover:bg-black/5 transition">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M22 12.06C22 6.49 17.52 2 12 2S2 6.49 2 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H8.08v-2.9h2.36V9.41c0-2.33 1.39-3.62 3.52-3.62c1.02 0 2.08.18 2.08.18v2.3h-1.17c-1.15 0-1.5.72-1.5 1.47v1.77h2.56l-.41 2.9h-2.15V22c4.78-.76 8.44-4.92 8.44-9.94Z" stroke="currentColor" strokeWidth="1.5"/></svg>
                </a>
                <a aria-label="Instagram" href="https://www.instagram.com/pentatraders" target="_blank" rel="noopener noreferrer" className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-black/10 hover:bg-black/5 transition">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.5"/><path d="M16.5 7.5h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5"/></svg>
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
              
              <div className="flex flex-wrap gap-x-5 gap-y-2 md:justify-end text-foreground/80">
                <a href="#home" className="hover:text-[var(--brand-primary)]">Home</a>
                <a href="#about" className="hover:text-[var(--brand-primary)]">About</a>
                <a href="#products" className="hover:text-[var(--brand-primary)]">Products</a>
                <a href="#memberships" className="hover:text-[var(--brand-primary)]">Memberships</a>
                <a href="#contact" className="hover:text-[var(--brand-primary)]">Contact</a>
              </div>
            </div>
          </div>
          <div className="mt-10 pt-6 border-t border-black/10 text-sm text-foreground/70 flex items-center justify-between">
            <span>© {new Date().getFullYear()} Penta Traders. All rights reserved.</span>
            
          </div>
        </div>
      </footer>

      {/* Scroll arrow (single) */}
      {showTop && (
        <button
          type="button"
          aria-label="Scroll to top"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed right-4 bottom-4 h-12 w-12 z-[60] rounded-full shadow-lg transition focus-brand inline-flex items-center justify-center"
          style={{ background: "var(--brand-primary)", color: "#000" }}
        >
          <svg className="block" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 15l6-6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      )}
    </div>
  );
}
