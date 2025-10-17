"use client";

import { useEffect, useRef, useState } from "react";

export default function Home() {
  const [showVideo, setShowVideo] = useState(true);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Smooth scroll function with precise positioning for mobile and desktop
  const smoothScrollTo = (element: HTMLElement) => {
    // Dynamic header height based on screen size
    const isMobile = window.innerWidth < 768;
    const headerHeight = isMobile ? 20 : 80; // Very small offset for mobile
    
    const elementRect = element.getBoundingClientRect();
    const targetPosition = elementRect.top + window.pageYOffset - headerHeight;
    
    // Use custom smooth scroll for better control
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    const duration = 600; // Smooth 600ms duration
    let start: number | null = null;

    const animation = (currentTime: number) => {
      if (start === null) start = currentTime;
      const timeElapsed = currentTime - start;
      const progress = Math.min(timeElapsed / duration, 1);
      
      // Smooth easing function
      const easeInOutCubic = (t: number) => {
        return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
      };
      
      const easedProgress = easeInOutCubic(progress);
      const currentPosition = startPosition + (distance * easedProgress);
      
      window.scrollTo({
        top: currentPosition,
        behavior: 'auto'
      });
      
      if (progress < 1) {
        requestAnimationFrame(animation);
      }
    };

    requestAnimationFrame(animation);
  };

  // Special scroll function for contact section
  const scrollToContact = () => {
    const contactSection = document.querySelector('#contact') as HTMLElement;
    if (contactSection) {
      smoothScrollTo(contactSection);
    }
  };

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      const handleError = () => {
        console.log('Video failed to load, showing fallback image');
        setShowVideo(false);
      };

      video.addEventListener('error', handleError);
      
      return () => {
        video.removeEventListener('error', handleError);
      };
    }
  }, []);

  useEffect(() => {
    // Smooth scroll functionality with header offset
    const handleSmoothScroll = (e: Event) => {
      const target = e.target as HTMLAnchorElement;
      const href = target.getAttribute('href');
      
      if (href && href.startsWith('#')) {
        e.preventDefault();
        const targetElement = document.querySelector(href) as HTMLElement;
        if (targetElement) {
          smoothScrollTo(targetElement);
        }
      }
    };

    // Add event listeners to smooth scroll links
    const smoothScrollLinks = document.querySelectorAll('.smooth-scroll');
    smoothScrollLinks.forEach(link => {
      link.addEventListener('click', handleSmoothScroll);
    });

    // Scroll detection for scroll to top button
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      setShowScrollTop(scrollTop > 400);
    };

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      smoothScrollLinks.forEach(link => {
        link.removeEventListener('click', handleSmoothScroll);
      });
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-50 border-b border-gray-200">
        <div className="container mx-auto px-4 md:px-6 py-3 md:py-4">
          <nav className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center">
              <img 
                src="/Penta Traders logo.png" 
                alt="Penta Traders Logo" 
                className="h-12 md:h-16 w-auto object-contain"
              />
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8 xl:space-x-12">
              <a href="#home" className="text-gray-700 hover:text-gray-900 transition-colors font-medium smooth-scroll">Home</a>
              <a href="#about" className="text-gray-700 hover:text-gray-900 transition-colors font-medium smooth-scroll">About</a>
              <a href="#products" className="text-gray-700 hover:text-gray-900 transition-colors font-medium smooth-scroll">Products</a>
              <a href="#memberships" className="text-gray-700 hover:text-gray-900 transition-colors font-medium smooth-scroll">Memberships</a>
            </div>

            {/* Desktop CTA Button */}
            <div className="hidden lg:block">
              <button 
                onClick={scrollToContact}
                className="text-white px-4 md:px-6 py-2 md:py-3 rounded-full font-semibold hover:opacity-90 transition-all duration-300 transform hover:scale-105 hover:shadow-lg text-sm md:text-base"
                style={{ backgroundColor: '#023047' }}
              >
                Request a Quote
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              onClick={() => {
                const menu = document.getElementById('mobile-menu');
                if (menu) {
                  menu.classList.toggle('hidden');
                }
              }}
              aria-label="Toggle mobile menu"
            >
              <svg 
                className="w-6 h-6 text-gray-700" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </nav>

          {/* Mobile Navigation Menu */}
          <div id="mobile-menu" className="hidden lg:hidden mt-4 pb-4 border-t border-gray-200">
            <div className="flex flex-col space-y-4 pt-4">
              <a 
                href="#home" 
                className="text-gray-700 hover:text-gray-900 transition-colors font-medium smooth-scroll py-2 px-3 rounded-lg hover:bg-gray-50"
                onClick={() => {
                  const menu = document.getElementById('mobile-menu');
                  if (menu) menu.classList.add('hidden');
                }}
              >
                Home
          </a>
          <a
                href="#about" 
                className="text-gray-700 hover:text-gray-900 transition-colors font-medium smooth-scroll py-2 px-3 rounded-lg hover:bg-gray-50"
                onClick={() => {
                  const menu = document.getElementById('mobile-menu');
                  if (menu) menu.classList.add('hidden');
                }}
              >
                About
              </a>
              <a 
                href="#products" 
                className="text-gray-700 hover:text-gray-900 transition-colors font-medium smooth-scroll py-2 px-3 rounded-lg hover:bg-gray-50"
                onClick={() => {
                  const menu = document.getElementById('mobile-menu');
                  if (menu) menu.classList.add('hidden');
                }}
              >
                Products
        </a>
        <a
                href="#memberships" 
                className="text-gray-700 hover:text-gray-900 transition-colors font-medium smooth-scroll py-2 px-3 rounded-lg hover:bg-gray-50"
                onClick={() => {
                  const menu = document.getElementById('mobile-menu');
                  if (menu) menu.classList.add('hidden');
                }}
              >
                Memberships
              </a>
              <button 
                className="text-white px-4 py-3 rounded-full font-semibold hover:opacity-90 transition-all duration-300 transform hover:scale-105 hover:shadow-lg text-center mt-2"
                style={{ backgroundColor: '#023047' }}
                onClick={() => {
                  const menu = document.getElementById('mobile-menu');
                  if (menu) menu.classList.add('hidden');
                  // Scroll to contact form instantly
                  scrollToContact();
                }}
              >
                Request a Quote
              </button>
            </div>
          </div>
        </div>
      </header>

       {/* Hero Section */}
       <section id="home" className="relative h-[90vh] md:h-screen flex items-center justify-center text-white overflow-hidden">
         <div 
           className="absolute inset-0 bg-gradient-to-br from-black/40 via-black/60 to-black/80"
           style={{ zIndex: 2 }}
         ></div>
         <div className="absolute inset-0" style={{ zIndex: 1 }}>
           {showVideo ? (
             <video 
               ref={videoRef}
               autoPlay 
               muted 
               loop 
               playsInline
               preload="auto"
               poster="/home-banner.gif"
               controls={false}
               disablePictureInPicture
               className="w-full h-full object-cover animate-pulse-slow"
               style={{
                 transform: 'translateZ(0)',
                 WebkitTransform: 'translateZ(0)',
                 backfaceVisibility: 'hidden',
                 WebkitBackfaceVisibility: 'hidden',
                 pointerEvents: 'none'
               } as React.CSSProperties}
             >
               <source src="/banner%20video.mp4" type="video/mp4" />
             </video>
           ) : (
             <img 
               src="/home-banner.gif" 
               alt="Penta Traders Banner" 
               className="w-full h-full object-cover animate-pulse-slow"
             />
           )}
         </div>
         <div className="relative z-10 text-center max-w-6xl mx-auto px-4 animate-fade-in-up">
           <div className="mb-6">
              <span className="inline-block px-4 py-2 bg-yellow-500/20 backdrop-blur-sm rounded-full text-yellow-400 text-sm md:text-base font-medium mb-4">
                🇵🇰 Trusted Pakistani Exporter
              </span>
           </div>
           <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold mb-6 text-yellow-500 drop-shadow-2xl animate-slide-in-left" style={{ textShadow: '0 0 30px rgba(255, 255, 255, 0.3)' }}>
             Penta Traders
           </h1>
           <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-8 text-white drop-shadow-2xl animate-slide-in-right">
             From Pakistan to the World
           </h2>
           <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl mb-12 max-w-5xl mx-auto text-white/95 drop-shadow-lg leading-relaxed animate-fade-in-up-delay">
             Delivering Pakistan&apos;s finest products to global markets with authenticity, quality, and reliability.
           </p>
            <div className="flex flex-row gap-3 justify-center animate-fade-in-up-delay-2">
             <button 
               onClick={() => {
                 const productsSection = document.querySelector('#products');
                 if (productsSection) {
                   smoothScrollTo(productsSection as HTMLElement);
                 }
               }}
               className="bg-yellow-500 text-gray-900 px-6 py-3 rounded-full text-base font-semibold hover:bg-yellow-600 transition-all duration-300 transform hover:scale-105 hover:shadow-lg focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2"
             >
               Explore Our Exports
             </button>
             <button 
               onClick={scrollToContact}
               className="text-white px-6 py-3 rounded-full text-base font-semibold hover:opacity-90 transition-all duration-300 transform hover:scale-105 hover:shadow-lg focus:ring-2 focus:ring-offset-2"
               style={{ backgroundColor: '#023047' }}
             >
               Request a Quote
             </button>
           </div>
         </div>
         
         {/* Scroll Indicator */}
         
       </section>

       {/* About Us Section */}
       <section id="about" className="py-16 md:py-24 bg-white scroll-mt-20">
         <div className="container mx-auto px-4">
           <div className="max-w-7xl mx-auto">
             {/* About Us Card */}
             <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 mb-16 animate-fade-in-up border border-gray-100">
               <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
                 {/* Left Column - About Us */}
                 <div className="animate-slide-in-left">
                   <span className="text-sm text-gray-500 uppercase tracking-wide font-medium mb-4 block">ABOUT US</span>
                   <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-8 leading-tight">
                     Connecting Pakistan to Global Markets Since 2021
                   </h2>
                   
                   <div className="space-y-6 text-gray-600 leading-relaxed">
                     <p>
                       Penta Traders is a registered export company headquartered in Lahore, Pakistan. Founded in 2021, we are dedicated to delivering authentic Pakistani products to global clients with a focus on quality, transparency, and timely delivery.
                     </p>
                     <p>
                       Since 2021, Penta Traders has been connecting Pakistan&apos;s heritage crafts, natural resources, and sustainable products to buyers worldwide. Based in Lahore, we are officially registered with the FBR and members of the LCCI and PCMEA.
                     </p>
                   </div>

                   <div className="flex flex-wrap gap-3 mt-8">
                     <span className="bg-gray-100 text-gray-700 px-4 py-2 rounded-full text-sm font-medium">On-time Delivery</span>
                     <span className="bg-gray-100 text-gray-700 px-4 py-2 rounded-full text-sm font-medium">Authentic Sourcing</span>
                     <span className="bg-gray-100 text-gray-700 px-4 py-2 rounded-full text-sm font-medium">Global Fulfillment</span>
                   </div>
                 </div>

                 {/* Right Column - Why Choose Us */}
                 <div className="animate-slide-in-right">
                   <span className="text-sm text-gray-500 uppercase tracking-wide font-medium mb-6 block">Why Choose Us</span>
                   
                   <div className="space-y-6">
                     <div className="flex items-start space-x-4 group">
                       <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform duration-300">
                         <span className="text-white text-sm font-bold">✓</span>
                       </div>
                       <p className="text-gray-700 leading-relaxed group-hover:text-gray-900 transition-colors">Registered with FBR</p>
                     </div>
                     <div className="flex items-start space-x-4 group">
                       <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform duration-300">
                         <span className="text-white text-sm font-bold">✓</span>
                       </div>
                       <p className="text-gray-700 leading-relaxed group-hover:text-gray-900 transition-colors">Member - Lahore Chamber of Commerce & Industry (LCCI)</p>
                     </div>
                     <div className="flex items-start space-x-4 group">
                       <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform duration-300">
                         <span className="text-white text-sm font-bold">✓</span>
                       </div>
                       <p className="text-gray-700 leading-relaxed group-hover:text-gray-900 transition-colors">Member - Pakistan Carpet Manufacturers & Exporters Association (PCMEA)</p>
                     </div>
                     <div className="flex items-start space-x-4 group">
                       <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform duration-300">
                         <span className="text-white text-sm font-bold">✓</span>
                       </div>
                       <p className="text-gray-700 leading-relaxed group-hover:text-gray-900 transition-colors">Strategic location in Lahore, Pakistan&apos;s trade hub</p>
                     </div>
                     <div className="flex items-start space-x-4 group">
                       <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform duration-300">
                         <span className="text-white text-sm font-bold">✓</span>
                       </div>
                       <p className="text-gray-700 leading-relaxed group-hover:text-gray-900 transition-colors">Trusted supplier network: artisans, manufacturers, and exporters</p>
                     </div>
                     <div className="flex items-start space-x-4 group">
                       <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform duration-300">
                         <span className="text-white text-sm font-bold">✓</span>
                       </div>
                       <p className="text-gray-700 leading-relaxed group-hover:text-gray-900 transition-colors">Commitment to ethical sourcing and sustainability</p>
                     </div>
                   </div>
                 </div>
               </div>
             </div>

             {/* Image and Our Story Section */}
             <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
               {/* Weaving Image */}
               <div className="animate-fade-in-up">
                 <div className="aspect-[4/3] overflow-hidden rounded-2xl shadow-xl">
                   <img 
                     src="/rugs images/image 3.jpg" 
                     alt="Traditional Pakistani rug weaving" 
                     className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                   />
                 </div>
               </div>

               {/* Our Story Card */}
               <div className="animate-fade-in-up-delay">
                 <div className="bg-white rounded-2xl shadow-xl p-8 hover-lift border border-gray-100">
                   <h3 className="text-3xl font-bold text-gray-800 mb-6">Our Story</h3>
                   <p className="text-gray-600 leading-relaxed mb-8">
                     We partner directly with artisans and certified manufacturers across Pakistan. From the Himalayan ranges to the bustling markets of Lahore, our network enables us to source responsibly and deliver reliably—at scale—while preserving the authenticity that buyers value. Every shipment carries a commitment to quality and a promise of professional service.
                   </p>

                   {/* Statistics */}
                   <div className="grid grid-cols-3 gap-4">
                     <div className="bg-yellow-50 rounded-xl p-4 text-center hover:bg-yellow-100 transition-colors duration-300">
                       <div className="text-3xl font-bold text-gray-800 mb-1">25+</div>
                       <div className="text-sm text-gray-600">Countries</div>
                     </div>
                     <div className="bg-yellow-50 rounded-xl p-4 text-center hover:bg-yellow-100 transition-colors duration-300">
                       <div className="text-3xl font-bold text-gray-800 mb-1">150+</div>
                       <div className="text-sm text-gray-600">Clients</div>
                     </div>
                     <div className="bg-yellow-50 rounded-xl p-4 text-center hover:bg-yellow-100 transition-colors duration-300">
                       <div className="text-3xl font-bold text-gray-800 mb-1">2021</div>
                       <div className="text-sm text-gray-600">Since</div>
                     </div>
                   </div>
                 </div>
               </div>
             </div>
           </div>
         </div>
       </section>

      {/* Mission & Vision Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-3xl shadow-xl p-8 md:p-12">
              <div className="grid md:grid-cols-2 gap-8">
                {/* Mission Card */}
                <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <div className="flex items-start space-x-4 mb-6">
                    <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800">Mission</h3>
                  </div>
                  <p className="text-gray-600 leading-relaxed">
                    To represent Pakistan&apos;s craftsmanship, natural resources, and innovation in the global marketplace while building long-term trade partnerships based on trust.
                  </p>
                </div>

                {/* Vision Card */}
                <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <div className="flex items-start space-x-4 mb-6">
                    <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800">Vision</h3>
                  </div>
                  <p className="text-gray-600 leading-relaxed">
                    To become a leading exporter from Pakistan recognized for authentic products, professional services, and global market reach.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Export Portfolio Section */}
      <section id="products" className="py-16 md:py-24 bg-gradient-to-br from-white to-gray-50 scroll-mt-20">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <span className="inline-block px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-4 animate-fade-in-up">
                OUR PRODUCTS
              </span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-6 animate-fade-in-up-delay">
                Our Export Portfolio
              </h2>
              <p className="text-lg md:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed animate-fade-in-up-delay-2">
                We source our products directly from local manufacturers and artisans, ensuring authenticity and quality. 
                Each product undergoes rigorous quality checks before export.
              </p>
              <div className="w-24 h-1 bg-blue-500 mx-auto rounded-full animate-shimmer mt-6"></div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-16">
              {/* Handmade Rugs */}
              <div className="group bg-white rounded-2xl shadow-xl p-6 lg:p-8 hover-lift border border-gray-100 animate-fade-in-up">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-red-600 rounded-xl flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl lg:text-2xl font-bold text-gray-800 group-hover:text-red-600 transition-colors">Handmade Rugs</h3>
                    <span className="inline-block bg-gradient-to-r from-red-100 to-red-200 text-red-800 px-3 py-1 rounded-full text-xs font-medium">Heritage</span>
                  </div>
                </div>
                
                <p className="text-gray-600 mb-6 leading-relaxed">Persian inspired, tribal, and modern designs with natural dyes.</p>
                
                <div className="grid grid-cols-3 gap-3 mb-6">
                  <div className="aspect-square overflow-hidden rounded-xl group-hover:scale-105 transition-transform duration-300">
                    <img src="/rugs images/image 3.jpg" alt="Handmade Rug 1" className="w-full h-full object-cover" />
                  </div>
                  <div className="aspect-square overflow-hidden rounded-xl group-hover:scale-105 transition-transform duration-300">
                    <img src="/rugs images/image 4.jpg" alt="Handmade Rug 2" className="w-full h-full object-cover" />
                  </div>
                  <div className="aspect-square overflow-hidden rounded-xl group-hover:scale-105 transition-transform duration-300">
                    <img src="/rugs images/images (1).jfif" alt="Handmade Rug 3" className="w-full h-full object-cover" />
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center space-x-3 group/item">
                    <div className="w-6 h-6 bg-yellow-100 rounded-full flex items-center justify-center group-hover/item:scale-110 transition-transform">
                      <span className="text-gray-700 text-xs font-bold">✓</span>
                    </div>
                    <p className="text-sm text-gray-700 group-hover/item:text-gray-900 transition-colors">100% handmade craftsmanship</p>
                  </div>
                  <div className="flex items-center space-x-3 group/item">
                    <div className="w-6 h-6 bg-yellow-100 rounded-full flex items-center justify-center group-hover/item:scale-110 transition-transform">
                      <span className="text-gray-700 text-xs font-bold">✓</span>
                    </div>
                    <p className="text-sm text-gray-700 group-hover/item:text-gray-900 transition-colors">Heritage designs & patterns</p>
                  </div>
                  <div className="flex items-center space-x-3 group/item">
                    <div className="w-6 h-6 bg-yellow-100 rounded-full flex items-center justify-center group-hover/item:scale-110 transition-transform">
                      <span className="text-gray-700 text-xs font-bold">✓</span>
                    </div>
                    <p className="text-sm text-gray-700 group-hover/item:text-gray-900 transition-colors">Bulk orders & custom sizes available</p>
                  </div>
                </div>
              </div>

              {/* Himalayan Pink Salt */}
              <div className="group bg-white rounded-2xl shadow-xl p-6 lg:p-8 hover-lift border border-gray-100 animate-fade-in-up-delay">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-pink-600 rounded-xl flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl lg:text-2xl font-bold text-gray-800 group-hover:text-pink-600 transition-colors">Himalayan Pink Salt</h3>
                    <span className="inline-block bg-gradient-to-r from-pink-100 to-pink-200 text-pink-800 px-3 py-1 rounded-full text-xs font-medium">Natural</span>
                  </div>
                </div>
                
                <p className="text-gray-600 mb-6 leading-relaxed">Lamps, tiles, and edible salt from the purest Himalayan sources.</p>
                
                <div className="grid grid-cols-3 gap-3 mb-6">
                  <div className="aspect-square overflow-hidden rounded-xl group-hover:scale-105 transition-transform duration-300">
                    <img src="/himalyan salt images/Himalayan-Salt-Products.jpg" alt="Himalayan Salt 1" className="w-full h-full object-cover" />
                  </div>
                  <div className="aspect-square overflow-hidden rounded-xl group-hover:scale-105 transition-transform duration-300">
                    <img src="/himalyan salt images/images (2).jfif" alt="Himalayan Salt 2" className="w-full h-full object-cover" />
                  </div>
                  <div className="aspect-square overflow-hidden rounded-xl group-hover:scale-105 transition-transform duration-300">
                    <img src="/himalyan salt images/images.jfif" alt="Himalayan Salt 3" className="w-full h-full object-cover" />
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center space-x-3 group/item">
                    <div className="w-6 h-6 bg-yellow-100 rounded-full flex items-center justify-center group-hover/item:scale-110 transition-transform">
                      <span className="text-gray-700 text-xs font-bold">✓</span>
                    </div>
                    <p className="text-sm text-gray-700 group-hover/item:text-gray-900 transition-colors">Salt lamps & candle holders</p>
                  </div>
                  <div className="flex items-center space-x-3 group/item">
                    <div className="w-6 h-6 bg-yellow-100 rounded-full flex items-center justify-center group-hover/item:scale-110 transition-transform">
                      <span className="text-gray-700 text-xs font-bold">✓</span>
                    </div>
                    <p className="text-sm text-gray-700 group-hover/item:text-gray-900 transition-colors">Cooking slabs & salt tiles</p>
                  </div>
                  <div className="flex items-center space-x-3 group/item">
                    <div className="w-6 h-6 bg-yellow-100 rounded-full flex items-center justify-center group-hover/item:scale-110 transition-transform">
                      <span className="text-gray-700 text-xs font-bold">✓</span>
                    </div>
                    <p className="text-sm text-gray-700 group-hover/item:text-gray-900 transition-colors">Edible salt (fine & coarse)</p>
                  </div>
                </div>
              </div>

              {/* Bamboo Baskets */}
              <div className="group bg-white rounded-2xl shadow-xl p-6 lg:p-8 hover-lift border border-gray-100 animate-fade-in-up-delay-2 md:col-span-2 lg:col-span-1">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl lg:text-2xl font-bold text-gray-800 group-hover:text-green-600 transition-colors">Bamboo Baskets</h3>
                    <span className="inline-block bg-gradient-to-r from-green-100 to-green-200 text-green-800 px-3 py-1 rounded-full text-xs font-medium">Sustainable</span>
                  </div>
                </div>
                
                <p className="text-gray-600 mb-6 leading-relaxed">Eco-friendly and stylish bamboo products for modern living.</p>
                
                <div className="grid grid-cols-3 gap-3 mb-6">
                  <div className="aspect-square overflow-hidden rounded-xl group-hover:scale-105 transition-transform duration-300">
                    <img src="/bamboo basktets/bamboo basktets 1.jfif" alt="Bamboo Basket 1" className="w-full h-full object-cover" />
                  </div>
                  <div className="aspect-square overflow-hidden rounded-xl group-hover:scale-105 transition-transform duration-300">
                    <img src="/bamboo basktets/image 2.jfif" alt="Bamboo Basket 2" className="w-full h-full object-cover" />
                  </div>
                  <div className="aspect-square overflow-hidden rounded-xl group-hover:scale-105 transition-transform duration-300">
                    <img src="/bamboo basktets/image 3.jfif" alt="Bamboo Basket 3" className="w-full h-full object-cover" />
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center space-x-3 group/item">
                    <div className="w-6 h-6 bg-yellow-100 rounded-full flex items-center justify-center group-hover/item:scale-110 transition-transform">
                      <span className="text-gray-700 text-xs font-bold">✓</span>
                    </div>
                    <p className="text-sm text-gray-700 group-hover/item:text-gray-900 transition-colors">100% natural bamboo</p>
                  </div>
                  <div className="flex items-center space-x-3 group/item">
                    <div className="w-6 h-6 bg-yellow-100 rounded-full flex items-center justify-center group-hover/item:scale-110 transition-transform">
                      <span className="text-gray-700 text-xs font-bold">✓</span>
                    </div>
                    <p className="text-sm text-gray-700 group-hover/item:text-gray-900 transition-colors">Durable, reusable, and decorative</p>
                  </div>
                  <div className="flex items-center space-x-3 group/item">
                    <div className="w-6 h-6 bg-yellow-100 rounded-full flex items-center justify-center group-hover/item:scale-110 transition-transform">
                      <span className="text-gray-700 text-xs font-bold">✓</span>
                    </div>
                    <p className="text-sm text-gray-700 group-hover/item:text-gray-900 transition-colors">Storage, utility, and decorative styles</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Future Expansion */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Future Expansion Products</h3>
              <div className="flex flex-wrap gap-2">
                <span className="bg-gray-100 text-gray-700 px-4 py-2 rounded-full">Textiles & Apparel</span>
                <span className="bg-gray-100 text-gray-700 px-4 py-2 rounded-full">Leather Goods</span>
                <span className="bg-gray-100 text-gray-700 px-4 py-2 rounded-full">Sports Goods</span>
                <span className="bg-gray-100 text-gray-700 px-4 py-2 rounded-full">Surgical Instruments</span>
                <span className="bg-gray-100 text-gray-700 px-4 py-2 rounded-full">Agro Products (Rice, Spices, Dry Fruits)</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recognition & Trade Memberships */}
      <section id="memberships" className="py-16 bg-white scroll-mt-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-gray-800 mb-6">Our Recognition & Trade Memberships</h2>
            <p className="text-gray-600 mb-12">
              We are trusted by Pakistan&apos;s leading trade and commerce authorities, ensuring compliance and credibility in all our export operations.
            </p>

             <div className="flex flex-row md:grid md:grid-cols-3 gap-2 md:gap-8">
               <div className="bg-white rounded-lg shadow-lg p-4 md:p-8 border text-center">
                 <img 
                   src="/membership logo/fbr logo.jpg" 
                   alt="FBR Logo" 
                   className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-2 md:mb-4 object-contain"
                 />
                 <h3 className="text-sm md:text-lg font-semibold text-gray-800">FBR Registered</h3>
               </div>

               <div className="bg-white rounded-lg shadow-lg p-4 md:p-8 border text-center">
                 <img 
                   src="/membership logo/lahore chamber logo.jpg" 
                   alt="LCCI Logo" 
                   className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-2 md:mb-4 object-contain"
                 />
                 <h3 className="text-sm md:text-lg font-semibold text-gray-800">Member - LCCI</h3>
               </div>

               <div className="bg-white rounded-lg shadow-lg p-4 md:p-8 border text-center">
                 <img 
                   src="/membership logo/pcmea carpet pakistan.jpg" 
                   alt="PCMEA Logo" 
                   className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-2 md:mb-4 object-contain"
                 />
                 <h3 className="text-sm md:text-lg font-semibold text-gray-800">Member - PCMEA</h3>
               </div>
             </div>
          </div>
        </div>
      </section>

       {/* Contact Form Section */}
       <section id="contact" className="py-16 md:py-24 bg-gradient-to-br from-gray-50 to-white scroll-mt-20">
         <div className="container mx-auto px-4">
           <div className="max-w-3xl mx-auto">
             <div className="text-center mb-16">
               <span className="inline-block px-4 py-2 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium mb-4 animate-fade-in-up">
                 CONTACT US
               </span>
               <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6 animate-fade-in-up-delay">
                 Get in Touch
               </h2>
               <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed animate-fade-in-up-delay-2">
                 Ready to start your export journey with us? Let&apos;s discuss your requirements and explore opportunities together.
               </p>
               <div className="w-24 h-1 bg-yellow-500 mx-auto rounded-full animate-shimmer mt-6"></div>
             </div>
             
             <form 
               action="https://api.web3forms.com/submit" 
               method="POST" 
               className="space-y-6 max-w-6xl mx-auto animate-fade-in-up"
             >
               {/* Web3Forms Hidden Fields */}
               <input type="hidden" name="access_key" value="5a44e3e2-3214-4181-bfd7-bf04447a5e53" />
               <input type="hidden" name="subject" value="New Inquiry – Penta Traders" />
               <input type="hidden" name="from_name" value="Penta Traders Website" />
               <input type="hidden" name="redirect" value="/?success=1#contact" />
               <div className="space-y-1">
                 <label className="block text-sm font-medium text-gray-700">Full Name</label>
                 <input
                   type="text"
                   name="name"
                   required
                   className="w-full py-2 bg-transparent text-gray-900 border-0 border-b border-gray-300 focus:border-gray-500 focus:ring-0 focus:outline-none transition-colors duration-200 text-base"
                   placeholder=""
                 />
               </div>
               
               <div className="space-y-1">
                 <label className="block text-sm font-medium text-gray-700">Email Address</label>
                 <input
                   type="email"
                   name="email"
                   required
                   className="w-full py-2 bg-transparent text-gray-900 border-0 border-b border-gray-300 focus:border-gray-500 focus:ring-0 focus:outline-none transition-colors duration-200 text-base"
                   placeholder=""
                 />
               </div>
               
               <div className="space-y-1">
                 <label className="block text-sm font-medium text-gray-700">Company / Business Name</label>
                 <input
                   type="text"
                   name="company"
                   className="w-full py-2 bg-transparent text-gray-900 border-0 border-b border-gray-300 focus:border-gray-500 focus:ring-0 focus:outline-none transition-colors duration-200 text-base"
                   placeholder=""
                 />
               </div>
               
               <div className="space-y-1">
                 <label className="block text-sm font-medium text-gray-700">Country</label>
                 <input
                   type="text"
                   name="country"
                   className="w-full py-2 bg-transparent text-gray-900 border-0 border-b border-gray-300 focus:border-gray-500 focus:ring-0 focus:outline-none transition-colors duration-200 text-base"
                   placeholder=""
                 />
               </div>
               
               <div className="space-y-1">
                 <label className="block text-sm font-medium text-gray-700">Product Inquiry / Message</label>
                 <textarea
                   name="message"
                   required
                   rows={3}
                   className="w-full py-2 bg-transparent text-gray-900 border-0 border-b border-gray-300 focus:border-gray-500 focus:ring-0 focus:outline-none transition-colors duration-200 text-base resize-y"
                   placeholder=""
                 ></textarea>
               </div>
               
               <div className="pt-4">
                 <button
                   type="submit"
                   className="w-full text-white py-4 px-8 rounded-full text-lg font-semibold transition-all duration-300 hover:opacity-90 hover:scale-105 focus:ring-2 focus:ring-offset-2 shadow-lg hover:shadow-xl"
                   style={{ backgroundColor: '#023047' }}
                 >
                   Send Inquiry
                 </button>
               </div>
               
               <div className="text-center pt-4">
                 <p className="text-sm text-gray-500">
                   We usually respond within 1-2 business days
                 </p>
               </div>
             </form>
           </div>
         </div>
       </section>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-gray-50 to-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Left Column - Company Info */}
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <img 
                  src="/Penta Traders logo.png" 
                  alt="Penta Traders Logo" 
                  className="w-16 h-16 object-contain"
                />
              </div>
              <p className="text-gray-700 mb-6 max-w-md">
                Trusted exporter from Pakistan. Authentic products, professional service, and global reach.
              </p>
              <div className="flex space-x-4">
                <a href="mailto:pentatraders@hotmail.com" className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors">
                  <svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </a>
                <a href="https://www.facebook.com/official.pentatraders" target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors">
                  <svg className="w-4 h-4 text-gray-700" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a href="https://www.instagram.com/pentatraders" target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors">
                  <svg className="w-4 h-4 text-gray-700" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Middle Column - Contact */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-800 relative">
                Contact
                <div className="absolute bottom-0 left-0 w-12 h-1 bg-yellow-500"></div>
              </h3>
              <p className="text-gray-700 mb-2">
                Address: 27/10 Empress Road, Lahore, Pakistan
              </p>
              <a href="mailto:pentatraders@hotmail.com" className="text-gray-700 hover:text-gray-900 transition-colors">
                Email: pentatraders@hotmail.com
              </a>
            </div>

            {/* Right Column - Navigation */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-800 relative">
                Navigation
                <div className="absolute bottom-0 left-0 w-12 h-1 bg-yellow-500"></div>
              </h3>
              <ul className="flex flex-wrap gap-4">
                <li><a href="#home" className="text-gray-700 hover:text-gray-900 transition-colors smooth-scroll">Home</a></li>
                <li><a href="#about" className="text-gray-700 hover:text-gray-900 transition-colors smooth-scroll">About</a></li>
                <li><a href="#products" className="text-gray-700 hover:text-gray-900 transition-colors smooth-scroll">Products</a></li>
                <li><a href="#memberships" className="text-gray-700 hover:text-gray-900 transition-colors smooth-scroll">Memberships</a></li>
                <li><a href="#contact" className="text-gray-700 hover:text-gray-900 transition-colors smooth-scroll">Contact</a></li>
              </ul>
            </div>
          </div>
          
          {/* Separator Line */}
          <div className="border-t border-gray-300 mt-8 pt-8">
            <p className="text-gray-700 text-sm">© 2025 Penta Traders. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Perfect Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={() => {
            window.scrollTo({
              top: 0,
              behavior: 'smooth'
            });
          }}
          className="fixed bottom-6 w-12 h-12 bg-yellow-500 hover:bg-yellow-600 text-gray-800 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 z-50 flex items-center justify-center"
          style={{ 
            position: 'fixed',
            right: '24px',
            left: 'unset',
            bottom: '24px'
          }}
          aria-label="Scroll to top"
        >
          <svg 
            width="20" 
            height="20" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <path d="M18 15l-6-6-6 6"/>
          </svg>
        </button>
      )}
    </div>
  );
}