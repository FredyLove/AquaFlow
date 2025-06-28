import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Droplets, Truck, Shield, Clock, Phone, MapPin, Star, ChevronRight, Check } from "lucide-react";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 shadow-lg">
                <Droplets className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                  AquaFlow
                </h1>
                <p className="text-xs text-muted-foreground">Pure Water Delivery</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Link to="/customer-login">
                <Button variant="outline" className="border-blue-300 text-blue-600 hover:bg-blue-50">
                  Sign In
                </Button>
              </Link>
              <Link to="/customer-login">
                <Button variant="ghost" size="sm" className="text-blue-600 hover:bg-blue-50">
                  Order Now
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-24 px-4 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1556740738-b6a63e27c4df?q=80&w=2070&auto=format&fit=crop')] opacity-10 bg-cover bg-center"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-blue-50/80"></div>
        </div>
        
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 text-blue-600 mb-6 text-sm font-medium">
            <span className="mr-2">🚚 Fast Delivery Across Yaounde</span>
            <ChevronRight className="h-4 w-4" />
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Pure Water Delivered <br />
            <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
              To Your Doorstep
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Premium quality sachet and bottled water with fast, reliable delivery. 
            Order online and get fresh, clean water delivered within hours.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/customer-login">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-lg px-8 py-3 shadow-lg hover:shadow-blue-200/50 transition-all"
              >
                Order Now
              </Button>
            </Link>
            <Button 
              variant="outline" 
              size="lg" 
              className="text-lg px-8 py-3 border-blue-300 text-blue-600 hover:bg-blue-50"
            >
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <div className="max-w-7xl mx-auto px-4 mb-16">
        <div className="bg-white rounded-xl shadow-sm p-6 flex flex-wrap justify-center gap-8 md:gap-16">
          <div className="flex items-center gap-3">
            <div className="bg-green-100 p-2 rounded-full">
              <Check className="h-5 w-5 text-green-600" />
            </div>
            <span className="font-medium">CAMWATER Approved</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="bg-blue-100 p-2 rounded-full">
              <Check className="h-5 w-5 text-blue-600" />
            </div>
            <span className="font-medium">100% Pure</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="bg-amber-100 p-2 rounded-full">
              <Check className="h-5 w-5 text-amber-600" />
            </div>
            <span className="font-medium">Same-Day Delivery</span>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="inline-block px-3 py-1 rounded-full bg-blue-100 text-blue-600 text-sm font-medium mb-4">
              Why Choose Us
            </span>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Pure Water, Exceptional Service</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We go beyond just delivering water - we deliver peace of mind with every order
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Droplets className="h-8 w-8 text-blue-600" />,
                title: "Pure & Clean",
                description: "Premium filtered water that meets the highest quality standards",
                bg: "bg-blue-50"
              },
              {
                icon: <Truck className="h-8 w-8 text-blue-600" />,
                title: "Fast Delivery",
                description: "Same-day delivery available in most areas across Yaounde",
                bg: "bg-cyan-50"
              },
              {
                icon: <Shield className="h-8 w-8 text-blue-600" />,
                title: "Quality Assured",
                description: "CAMWATER approved with regular quality testing and certification",
                bg: "bg-blue-50"
              },
              {
                icon: <Clock className="h-8 w-8 text-blue-600" />,
                title: "24/7 Service",
                description: "Round-the-clock customer support and emergency water delivery",
                bg: "bg-cyan-50"
              }
            ].map((feature, index) => (
              <Card key={index} className={`border-0 ${feature.bg} hover:shadow-lg transition-shadow`}>
                <CardHeader className="items-center">
                  <div className="p-3 rounded-lg bg-white shadow-sm mb-4">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-center">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <CardDescription>{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-16 bg-gradient-to-br from-blue-50 to-cyan-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="inline-block px-3 py-1 rounded-full bg-blue-100 text-blue-600 text-sm font-medium mb-4">
              Our Products
            </span>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Quality Water Solutions</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Choose from our range of premium water products to suit your needs
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Sachet Water",
                subtitle: "Pure Water - 50cl sachets",
                price: "XAF 50",
                unit: "per sachet",
                minOrder: "Minimum order: 1 bag (20 sachets)",
                features: [
                  "NAFDAC Approved",
                  "Fresh & Clean",
                  "Affordable pricing"
                ],
                popular: false
              },
              {
                title: "Bottled Water",
                subtitle: "Premium Bottled Water - 75cl",
                price: "XAF 400",
                unit: "per bottle",
                minOrder: "Minimum order: 12 bottles",
                features: [
                  "Premium Quality",
                  "Recyclable Bottles",
                  "Perfect for events"
                ],
                popular: true
              },
              {
                title: "Bulk Orders",
                subtitle: "For Events & Offices",
                price: "Custom",
                unit: "pricing",
                minOrder: "Wholesale rates available",
                features: [
                  "Volume discounts",
                  "Flexible delivery",
                  "Custom packaging"
                ],
                popular: false
              }
            ].map((product, index) => (
              <div key={index} className="relative">
                {product.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white text-xs font-bold px-4 py-1 rounded-full shadow-md">
                    Most Popular
                  </div>
                )}
                <Card className={`h-full border-0 shadow-sm ${product.popular ? 'ring-2 ring-blue-500' : ''}`}>
                  <CardHeader>
                    <CardTitle>{product.title}</CardTitle>
                    <CardDescription>{product.subtitle}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <p className="text-2xl font-bold text-blue-600">
                          {product.price} <span className="text-sm font-normal text-muted-foreground">{product.unit}</span>
                        </p>
                        <p className="text-sm text-gray-600">{product.minOrder}</p>
                      </div>
                      
                      <ul className="space-y-2">
                        {product.features.map((feature, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700">{feature}</span>
                          </li>
                        ))}
                      </ul>
                      
                      <Link to="/customer-login">
                        <Button 
                          variant={product.popular ? "default" : "outline"} 
                          className="w-full mt-4 border-blue-300 text-blue-600 hover:bg-blue-50"
                        >
                          Order Now
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="inline-block px-3 py-1 rounded-full bg-blue-100 text-blue-600 text-sm font-medium mb-4">
              Testimonials
            </span>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">What Our Customers Say</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Don't just take our word for it - hear from our satisfied customers
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                rating: 5,
                quote: "Excellent service! Always on time and the water quality is outstanding. AquaFlow has been our go-to for office water supply.",
                author: "Adebayo O.",
                location: "Obili"
              },
              {
                rating: 5,
                quote: "Fast delivery and great customer service. I order weekly and they never disappoint. Highly recommended!",
                author: "Funmi A.",
                location: "Awae-Escalier"
              },
              {
                rating: 5,
                quote: "Clean, affordable water with reliable delivery. Perfect for our family needs. The online ordering system is very convenient.",
                author: "Michael T.",
                location: "Emana"
              }
            ].map((testimonial, index) => (
              <Card key={index} className="border-0 shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-6 italic relative before:content-[''] before:text-4xl before:text-gray-200 before:absolute before:-top-2 before:-left-2 before:font-serif">
                    {testimonial.quote}
                  </p>
                  <div>
                    <p className="font-semibold">{testimonial.author}</p>
                    <p className="text-sm text-gray-500">{testimonial.location}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-cyan-500 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {[
              { number: "10,000+", label: "Happy Customers" },
              { number: "24/7", label: "Delivery Service" },
              { number: "99.9%", label: "Purity Guarantee" },
              { number: "45min", label: "Average Delivery Time" }
            ].map((stat, index) => (
              <div key={index} className="space-y-2">
                <p className="text-4xl font-bold">{stat.number}</p>
                <p className="text-blue-100">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto bg-gradient-to-r from-blue-600 to-cyan-500 rounded-2xl p-8 text-white text-center shadow-xl">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join thousands of satisfied customers enjoying fresh, clean water delivered to their doorstep
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/customer-login">
              <Button 
                size="lg" 
                variant="secondary" 
                className="text-lg px-8 py-3 bg-white text-blue-600 hover:bg-white/90"
              >
                Create Your Account
              </Button>
            </Link>
            <Button 
              size="lg" 
              variant="outline" 
              className="text-lg px-8 py-3 border-white text-blue-600 hover:bg-white/10"
            >
              Contact Sales
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400">
                  <Droplets className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-white">AquaFlow</h3>
                  <p className="text-xs text-gray-400">Pure Water Delivery</p>
                </div>
              </div>
              <p className="text-gray-400 text-sm mb-4">
                Leading water distribution service in Yaounde, Cameroon. 
                Committed to providing clean, safe water to every doorstep.
              </p>
              <div className="flex gap-4">
                {["twitter", "facebook", "instagram", "linkedin"].map((social) => (
                  <a 
                    key={social} 
                    href="#" 
                    className="bg-gray-800 hover:bg-gray-700 p-2 rounded-full transition-colors"
                  >
                    <span className="sr-only">{social}</span>
                    <div className="h-5 w-5"></div>
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4">Quick Links</h4>
              <div className="space-y-3 text-sm">
                {[
                  { label: "Order Water", href: "/customer-login" },
                  { label: "Track Order", href: "#" },
                  { label: "Pricing", href: "#" },
                  { label: "About Us", href: "#" }
                ].map((link) => (
                  <Link 
                    key={link.label} 
                    to={link.href} 
                    className="block text-gray-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4">Support</h4>
              <div className="space-y-3 text-sm">
                {[
                  { label: "Help Center", href: "#" },
                  { label: "Contact Support", href: "#" },
                  { label: "Terms of Service", href: "#" },
                  { label: "Privacy Policy", href: "#" }
                ].map((link) => (
                  <a 
                    key={link.label} 
                    href={link.href} 
                    className="block text-gray-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4">Contact Info</h4>
              <div className="space-y-4 text-sm">
                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-gray-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-gray-400">Customer Support</p>
                    <p className="text-white">+237 699 816 331</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-gray-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-gray-400">Our Location</p>
                    <p className="text-white">Yaounde, Cameroon</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
            <p>© {new Date().getFullYear()} AquaFlow. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;