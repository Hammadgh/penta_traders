"use client";

import { useEffect, useRef, useState } from "react";

export default function Home() {
  const [showVideo, setShowVideo] = useState(true);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

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
          const headerHeight = 80; // Approximate header height
          const elementPosition = targetElement.offsetTop;
          const offsetPosition = elementPosition - headerHeight;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
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
        <div className="container mx-auto px-6 py-4">
          <nav className="flex items-center justify-between">
            <div className="flex items-center">
              <img 
                src="/Penta Traders logo.png" 
                alt="Penta Traders Logo" 
                className="h-16 w-auto object-contain"
              />
            </div>
            <div className="hidden md:flex items-center space-x-12">
              <a href="#home" className="text-gray-700 hover:text-gray-900 transition-colors font-medium smooth-scroll">Home</a>
              <a href="#about" className="text-gray-700 hover:text-gray-900 transition-colors font-medium smooth-scroll">About</a>
              <a href="#products" className="text-gray-700 hover:text-gray-900 transition-colors font-medium smooth-scroll">Products</a>
              <a href="#memberships" className="text-gray-700 hover:text-gray-900 transition-colors font-medium smooth-scroll">Memberships</a>
            </div>
            <div className="hidden md:block">
              <button className="bg-yellow-500 text-gray-800 px-6 py-3 rounded-lg font-semibold hover:bg-yellow-600 transition-colors shadow-sm">
                Request a Quote
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="relative h-screen flex items-center justify-center text-white">
        <div 
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.6) 70%, rgba(0,0,0,0.8) 100%)',
            zIndex: 2
          }}
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
              className="w-full h-full object-cover"
              style={{
                transform: 'translateZ(0)',
                WebkitTransform: 'translateZ(0)',
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden'
              }}
            >
              <source src="/banner%20video.mp4" type="video/mp4" />
            </video>
          ) : (
            <img 
              src="/home-banner.gif" 
              alt="Penta Traders Banner" 
              className="w-full h-full object-cover"
            />
          )}
        </div>
        <div className="relative z-10 text-center max-w-5xl mx-auto px-4">
          <h1 className="text-7xl md:text-9xl font-bold mb-6 text-white drop-shadow-lg">Penta Traders</h1>
          <h2 className="text-5xl md:text-7xl font-bold mb-8 text-white drop-shadow-lg">From Pakistan to the World</h2>
          <p className="text-2xl md:text-3xl mb-10 max-w-4xl mx-auto text-white drop-shadow-md leading-relaxed">
            Delivering Pakistan&apos;s finest products to global markets with authenticity, quality, and reliability.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button className="bg-yellow-500 text-gray-800 px-10 py-5 rounded-lg text-xl font-bold hover:bg-yellow-600 transition-all transform hover:scale-105 shadow-lg">
              Explore Our Exports
            </button>
            <button className="bg-yellow-500 text-gray-800 px-10 py-5 rounded-lg text-xl font-bold hover:bg-yellow-600 transition-all transform hover:scale-105 shadow-lg">
              Request a Quote
            </button>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className="py-16 bg-white scroll-mt-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-lg p-8">
            <div className="grid md:grid-cols-2 gap-12">
              {/* Left Column */}
              <div>
                <span className="text-sm text-gray-500 uppercase tracking-wide">ABOUT US</span>
                <h2 className="text-4xl font-bold text-gray-800 mt-2 mb-6">
                  Connecting Pakistan to Global Markets Since 2021
                </h2>
                <div className="space-y-4 text-gray-700">
                  <p>
                    Penta Traders is a registered export company based in Lahore, Pakistan, dedicated to showcasing the finest products our country has to offer to the world. We specialize in sourcing, quality assurance, and global distribution of authentic Pakistani goods.
                  </p>
                  <p>
                    Registered with the Federal Board of Revenue (FBR) and a proud member of the Lahore Chamber of Commerce & Industry (LCCI), we ensure all our exports meet international standards and regulations.
                  </p>
                </div>
                <div className="flex flex-wrap gap-2 mt-6">
                  <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">On-time Delivery</span>
                  <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">Authentic Sourcing</span>
                  <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">Global Fulfillment</span>
                </div>
              </div>

              {/* Right Column */}
              <div>
                <span className="text-sm text-gray-500 uppercase tracking-wide">Why Choose Us</span>
                <div className="mt-4 space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-sm">✓</span>
                    </div>
                    <p className="text-gray-700">Registered with FBR (Federal Board of Revenue)</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-sm">✓</span>
                    </div>
                    <p className="text-gray-700">Member - Lahore Chamber of Commerce & Industry (LCCI)</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-sm">✓</span>
                    </div>
                    <p className="text-gray-700">Strategic location in Lahore, Pakistan&apos;s trade hub</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-sm">✓</span>
                    </div>
                    <p className="text-gray-700">Direct sourcing from local manufacturers and artisans</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-sm">✓</span>
                    </div>
                    <p className="text-gray-700">Quality assurance and compliance with international standards</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-sm">✓</span>
                    </div>
                    <p className="text-gray-700">Reliable logistics and shipping solutions</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Export Portfolio Section */}
      <section id="products" className="py-16 bg-gray-50 scroll-mt-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-gray-800 text-center mb-6">Our Export Portfolio</h2>
            <p className="text-gray-600 text-center mb-12 max-w-3xl mx-auto">
              We source our products directly from local manufacturers and artisans, ensuring authenticity and quality. 
              Each product undergoes rigorous quality checks before export.
            </p>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {/* Handmade Rugs */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Handmade Rugs</h3>
                <p className="text-gray-600 mb-4">Persian inspired, tribal, and modern designs with natural dyes.</p>
                <span className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm mb-4">Heritage</span>
                
                <div className="grid grid-cols-3 gap-2 mb-4">
                  <img src="/rugs images/image 3.jpg" alt="Handmade Rug 1" className="aspect-square object-cover rounded" />
                  <img src="/rugs images/image 4.jpg" alt="Handmade Rug 2" className="aspect-square object-cover rounded" />
                  <img src="/rugs images/images (1).jfif" alt="Handmade Rug 3" className="aspect-square object-cover rounded" />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">✓</span>
                    </div>
                    <p className="text-sm text-gray-700">100% handmade craftsmanship</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">✓</span>
                    </div>
                    <p className="text-sm text-gray-700">Heritage designs & patterns</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">✓</span>
                    </div>
                    <p className="text-sm text-gray-700">Bulk orders & custom sizes available</p>
                  </div>
                </div>
              </div>

              {/* Himalayan Pink Salt */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Himalayan Pink Salt Products</h3>
                <p className="text-gray-600 mb-4">Lamps, tiles, and edible salt.</p>
                <span className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm mb-4">Natural</span>
                
                <div className="grid grid-cols-3 gap-2 mb-4">
                  <img src="/himalyan salt images/Himalayan-Salt-Products.jpg" alt="Himalayan Salt 1" className="aspect-square object-cover rounded" />
                  <img src="/himalyan salt images/images (2).jfif" alt="Himalayan Salt 2" className="aspect-square object-cover rounded" />
                  <img src="/himalyan salt images/images.jfif" alt="Himalayan Salt 3" className="aspect-square object-cover rounded" />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">✓</span>
                    </div>
                    <p className="text-sm text-gray-700">Salt lamps & candle holders</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">✓</span>
                    </div>
                    <p className="text-sm text-gray-700">Cooking slabs & salt tiles</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">✓</span>
                    </div>
                    <p className="text-sm text-gray-700">Edible salt (fine & coarse)</p>
                  </div>
                </div>
              </div>

              {/* Bamboo Baskets */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Bamboo Baskets</h3>
                <p className="text-gray-600 mb-4">Eco friendly and stylish.</p>
                <span className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm mb-4">Sustainable</span>
                
                <div className="grid grid-cols-3 gap-2 mb-4">
                  <img src="/bamboo basktets/bamboo basktets 1.jfif" alt="Bamboo Basket 1" className="aspect-square object-cover rounded" />
                  <img src="/bamboo basktets/image 2.jfif" alt="Bamboo Basket 2" className="aspect-square object-cover rounded" />
                  <img src="/bamboo basktets/image 3.jfif" alt="Bamboo Basket 3" className="aspect-square object-cover rounded" />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">✓</span>
                    </div>
                    <p className="text-sm text-gray-700">100% natural bamboo</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">✓</span>
                    </div>
                    <p className="text-sm text-gray-700">Durable, reusable, and decorative</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">✓</span>
                    </div>
                    <p className="text-sm text-gray-700">Storage, utility, and decorative styles</p>
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

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white rounded-lg shadow-lg p-8 border text-center">
                <img 
                  src="/membership logo/fbr logo.jpg" 
                  alt="FBR Logo" 
                  className="w-16 h-16 mx-auto mb-4 object-contain"
                />
                <h3 className="text-lg font-semibold text-gray-800">FBR Registered</h3>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-8 border text-center">
                <img 
                  src="/membership logo/lahore chamber logo.jpg" 
                  alt="LCCI Logo" 
                  className="w-16 h-16 mx-auto mb-4 object-contain"
                />
                <h3 className="text-lg font-semibold text-gray-800">Member - LCCI</h3>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-8 border text-center">
                <img 
                  src="/membership logo/pcmea carpet pakistan.jpg" 
                  alt="PCMEA Logo" 
                  className="w-16 h-16 mx-auto mb-4 object-contain"
                />
                <h3 className="text-lg font-semibold text-gray-800">Member - PCMEA</h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">Get in Touch</h2>
            <form className="space-y-6">
              <div>
                <input
                  type="text"
                  placeholder="Full Name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                />
              </div>
              <div>
                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                />
        </div>
              <div>
                <input
                  type="text"
                  placeholder="Company / Business Name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Country"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                />
              </div>
              <div>
                <textarea
                  placeholder="Product Inquiry / Message"
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-yellow-500 text-gray-800 py-4 rounded-lg text-lg font-semibold hover:bg-yellow-600 transition-colors"
              >
                Send Inquiry
              </button>
              <p className="text-sm text-gray-600 text-center">
                We usually respond within 1-2 business days.
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <img 
                  src="/Penta Traders logo.png" 
                  alt="Penta Traders Logo" 
                  className="w-8 h-8 object-contain"
                />
                <span className="text-xl font-bold">Penta Traders</span>
              </div>
              <p className="text-gray-300 mb-4">
                Trusted exporter from Pakistan. Authentic products, professional service, and global reach.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Facebook</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Instagram</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">LinkedIn</a>
              </div>
              <p className="text-gray-400 text-sm mt-4">© 2025 Penta Traders. All rights reserved.</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <p className="text-gray-300 mb-2">
                2nd Floor, 27/10, Empress Road,<br />
                Behind PSO Pump,<br />
                Lahore, Pakistan
              </p>
              <a href="mailto:pentatraders@hotmail.com" className="text-yellow-400 hover:text-yellow-300 transition-colors">
                pentatraders@hotmail.com
              </a>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <div className="space-y-2">
                <a href="#" className="block text-gray-300 hover:text-white transition-colors">Home</a>
                <a href="#" className="block text-gray-300 hover:text-white transition-colors">About</a>
                <a href="#" className="block text-gray-300 hover:text-white transition-colors">Products</a>
                <a href="#" className="block text-gray-300 hover:text-white transition-colors">Memberships</a>
                <a href="#" className="block text-gray-300 hover:text-white transition-colors">Contact</a>
              </div>
            </div>
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