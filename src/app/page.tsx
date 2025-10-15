import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="header">
        <div className="header-content">
          <div className="flex items-center">
        <Image
                src="/Penta Traders logo.png"
                alt="Penta Traders"
              width={60}
              height={60}
              className="logo"
          priority
        />
            </div>
          
          <nav className="nav">
            <a href="#home">Home</a>
            <a href="#about">About</a>
            <a href="#products">Products</a>
            <a href="#memberships">Memberships</a>
            <a href="#contact">Contact</a>
          </nav>
          
          <div className="hidden">
            <button className="btn">Request a Quote</button>
            </div>
          </div>
      </header>

      <main>
        {/* Hero Section */}
        <section id="home" className="hero">
          <div className="hero-content">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="block">Penta Traders</span>
              <span className="block">From Pakistan to the World</span>
              </h1>
            <p className="text-lg mb-8 text-white/90 max-w-2xl mx-auto">
              Delivering Pakistan&apos;s finest products to global markets with authenticity, quality, and reliability.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="#products" className="btn">Explore Our Exports</a>
              <a href="#contact" className="btn">Request a Quote</a>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="section">
          <div className="container">
            <div className="card">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <p className="text-sm text-gray-600 mb-4">ABOUT US</p>
                  <h2 className="text-3xl md:text-4xl font-bold mb-6">
                    Connecting Pakistan to Global Markets Since 2021
                  </h2>
                  <p className="text-gray-700 text-lg mb-4">
                    Penta Traders is a registered export company headquartered in Lahore, Pakistan. 
                    Founded in 2021, we are dedicated to delivering authentic Pakistani products to 
                    global clients with a focus on quality, transparency, and timely delivery.
                  </p>
                  <p className="text-gray-600 mb-6">
                    Since 2021, Penta Traders has been connecting Pakistan&apos;s heritage crafts, 
                    natural resources, and sustainable products to buyers worldwide. Based in Lahore, 
                    we are officially registered with the FBR and members of the LCCI and PCMEA.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="card p-4">
                      <span className="text-gray-700 font-medium">On-time Delivery</span>
                      </div>
                    <div className="card p-4">
                      <span className="text-gray-700 font-medium">Authentic Sourcing</span>
                  </div>
                    <div className="card p-4">
                      <span className="text-gray-700 font-medium">Global Fulfillment</span>
                </div>
              </div>
              </div>

                <div>
                  <div className="card">
                    <h3 className="text-xl font-semibold mb-4">Why Choose Us</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <div className="check-icon"></div>
                        <span className="text-gray-700">Registered with FBR</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="check-icon"></div>
                        <span className="text-gray-700">Member – Lahore Chamber of Commerce & Industry (LCCI)</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="check-icon"></div>
                        <span className="text-gray-700">Member – Pakistan Carpet Manufacturers & Exporters Association (PCMEA)</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="check-icon"></div>
                        <span className="text-gray-700">Strategic location in Lahore, Pakistan&apos;s trade hub</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="check-icon"></div>
                        <span className="text-gray-700">Trusted supplier network: artisans, manufacturers, and exporters</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="check-icon"></div>
                        <span className="text-gray-700">Commitment to ethical sourcing and sustainability</span>
                      </li>
                    </ul>
                  </div>
              </div>
            </div>
            </div>
          </div>
        </section>

        {/* Products Section */}
        <section id="products" className="section bg-gray-50">
          <div className="container">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Export Portfolio</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                At Penta Traders, we carefully source products that showcase the heritage, 
                natural wealth, and craftsmanship of Pakistan. Our exports meet international 
                quality standards and cater to diverse industries worldwide.
              </p>
            </div>

            <div className="product-grid">
            {/* Rugs */}
              <div className="product-card">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                <div>
                      <h3 className="text-xl font-semibold">Handmade Rugs</h3>
                      <p className="text-gray-600">Persian-inspired, tribal, and modern designs with natural dyes.</p>
                </div>
                    <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
                      Heritage
                    </span>
              </div>
                  
                  <div className="product-images mb-4">
                    <Image src="/rugs images/image 3.jpg" alt="Rug 1" width={100} height={80} className="rounded" />
                    <Image src="/rugs images/image 4.jpg" alt="Rug 2" width={100} height={80} className="rounded" />
                    <Image src="/rugs images/images (1).jfif" alt="Rug 3" width={100} height={80} className="rounded" />
                </div>
                  
                  <ul className="product-features">
                    <li>
                      <div className="check-icon"></div>
                      <span>100% handmade craftsmanship</span>
                    </li>
                    <li>
                      <div className="check-icon"></div>
                      <span>Heritage designs & patterns</span>
                    </li>
                    <li>
                      <div className="check-icon"></div>
                      <span>Bulk orders & custom sizes available</span>
                  </li>
              </ul>
                </div>
            </div>

            {/* Himalayan Salt */}
              <div className="product-card">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                <div>
                      <h3 className="text-xl font-semibold">Himalayan Pink Salt Products</h3>
                      <p className="text-gray-600">Lamps, tiles, and edible salt.</p>
                </div>
                    <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
                      Natural
                    </span>
              </div>
                  
                  <div className="product-images mb-4">
                    <Image src="/himalyan salt images/Himalayan-Salt-Products.jpg" alt="Salt Products 1" width={100} height={80} className="rounded" />
                    <Image src="/himalyan salt images/images (2).jfif" alt="Salt Products 2" width={100} height={80} className="rounded" />
                    <Image src="/himalyan salt images/images.jfif" alt="Salt Products 3" width={100} height={80} className="rounded" />
                </div>
                  
                  <ul className="product-features">
                    <li>
                      <div className="check-icon"></div>
                      <span>Salt lamps & candle holders</span>
                    </li>
                    <li>
                      <div className="check-icon"></div>
                      <span>Cooking slabs & salt tiles</span>
                    </li>
                    <li>
                      <div className="check-icon"></div>
                      <span>Edible salt (fine & coarse)</span>
                  </li>
              </ul>
                </div>
            </div>

            {/* Bamboo Baskets */}
              <div className="product-card">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                <div>
                      <h3 className="text-xl font-semibold">Bamboo Baskets</h3>
                      <p className="text-gray-600">Eco-friendly and stylish.</p>
                </div>
                    <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
                      Sustainable
                    </span>
              </div>
                  
                  <div className="product-images mb-4">
                    <Image src="/bamboo basktets/bamboo basktets 1.jfif" alt="Bamboo Basket 1" width={100} height={80} className="rounded" />
                    <Image src="/bamboo basktets/image 2.jfif" alt="Bamboo Basket 2" width={100} height={80} className="rounded" />
                    <Image src="/bamboo basktets/image 3.jfif" alt="Bamboo Basket 3" width={100} height={80} className="rounded" />
                </div>
                  
                  <ul className="product-features">
                    <li>
                      <div className="check-icon"></div>
                      <span>100% natural bamboo</span>
                    </li>
                    <li>
                      <div className="check-icon"></div>
                      <span>Durable, reusable, and decorative</span>
                    </li>
                    <li>
                      <div className="check-icon"></div>
                      <span>Storage, utility, and decorative styles</span>
                  </li>
              </ul>
                </div>
            </div>
          </div>

            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-4">Future Expansion Products</h3>
              <div className="flex flex-wrap gap-2">
              {[
                "Textiles & Apparel",
                "Leather Goods",
                "Sports Goods",
                "Surgical Instruments",
                "Agro Products (Rice, Spices, Dry Fruits)",
              ].map((item) => (
                  <span key={item} className="card px-3 py-1 text-sm">
                    {item}
                  </span>
              ))}
            </div>
          </div>
          </div>
        </section>

        {/* Memberships Section */}
        <section id="memberships" className="section">
          <div className="container">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
    Our Recognition & Trade Memberships
  </h2>
              <p className="text-lg text-gray-600">
                We are trusted by Pakistan&apos;s leading trade and commerce authorities.
              </p>
            </div>

            <div className="membership-grid">
              <div className="membership-card">
        <Image
                  src="/membership logo/fbr logo.jpg"
          alt="FBR Registered"
                  width={120}
                  height={80}
                  className="membership-logo"
        />
                <p className="text-sm font-medium">FBR Registered</p>
    </div>

              <div className="membership-card">
        <Image
                  src="/membership logo/lahore chamber logo.jpg"
          alt="Lahore Chamber of Commerce & Industry (LCCI)"
                  width={120}
                  height={80}
                  className="membership-logo"
        />
                <p className="text-sm font-medium">Member – LCCI</p>
    </div>

              <div className="membership-card">
        <Image
                  src="/membership logo/pcmea carpet pakistan.jpg"
          alt="Pakistan Carpet Manufacturers & Exporters Association (PCMEA)"
                  width={120}
                  height={80}
                  className="membership-logo"
        />
                <p className="text-sm font-medium">Member – PCMEA</p>
      </div>
    </div>
  </div>
</section>

        {/* Contact Section */}
        <section id="contact" className="section bg-gray-50">
          <div className="container">
            <form action="https://api.web3forms.com/submit" method="POST" className="form">
              <input type="hidden" name="access_key" value="5a44e3e2-3214-4181-bfd7-bf04447a5e53" />
              <input type="hidden" name="subject" value="New Inquiry – Penta Traders" />
              <input type="hidden" name="from_name" value="Penta Traders Website" />
              <input type="hidden" name="redirect" value="/?success=1#contact" />
              <input type="checkbox" name="botcheck" className="hidden" />
              
              <h2 className="text-2xl font-bold mb-6 text-center">Get In Touch</h2>
              
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <input name="name" type="text" required className="form-input" />
              </div>
              
              <div className="form-group">
                <label className="form-label">Email Address</label>
                <input name="email" type="email" required className="form-input" />
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Company / Business Name</label>
                  <input name="company" type="text" className="form-input" />
              </div>
                <div className="form-group">
                  <label className="form-label">Country</label>
                  <input name="country" type="text" className="form-input" />
              </div>
              </div>
              
              <div className="form-group">
                <label className="form-label">Product Inquiry / Message</label>
                <textarea name="message" required className="form-textarea" rows={5}></textarea>
              </div>
              
              <button type="submit" className="btn w-full">Send Inquiry</button>
              <p className="text-sm text-gray-500 text-center mt-4">
                We usually respond within 1–2 business days.
              </p>
            </form>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <div className="flex items-center mb-4">
              <Image src="/Penta Traders logo.png" alt="Penta Traders" width={48} height={48} className="mr-3" />
                </div>
            <p className="text-gray-500 mb-4">
              Trusted exporter from Pakistan. Authentic products, professional service, and global reach.
            </p>
            <div className="flex gap-3">
              <a href="mailto:abdullah.basharat@hotmail.com" className="text-gray-600 hover:text-yellow-500">
                📧 Email
              </a>
              <a href="https://www.facebook.com/official.pentatraders" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-yellow-500">
                📘 Facebook
              </a>
              <a href="https://www.instagram.com/pentatraders" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-yellow-500">
                📷 Instagram
              </a>
              </div>
            </div>

          <div className="footer-section">
            <h4>Contact</h4>
              <p>Address: 2nd Floor, 27/10, Empress Road, Behind PSO Pump, Lahore, Pakistan</p>
              <p>
              Email: <a href="mailto:abdullah.basharat@hotmail.com" className="underline">pentatraders@hotmail.com</a>
              </p>
            </div>

          <div className="footer-section">
            <h4>Quick Links</h4>
            <div className="flex flex-col gap-2">
              <a href="#home" className="hover:text-yellow-500">Home</a>
              <a href="#about" className="hover:text-yellow-500">About</a>
              <a href="#products" className="hover:text-yellow-500">Products</a>
              <a href="#memberships" className="hover:text-yellow-500">Memberships</a>
              <a href="#contact" className="hover:text-yellow-500">Contact</a>
              </div>
            </div>
          </div>
            
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Penta Traders. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}