import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Droplets, Truck, Shield, Clock, Phone, MapPin, Star } from "lucide-react";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl water-gradient">
                <Droplets className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold">AquaFlow</h1>
                <p className="text-xs text-muted-foreground">Pure Water Delivery</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Link to="/track/ORD-001">
                <Button variant="ghost" size="sm">Track Order</Button>
              </Link>
              <Link to="/customer-login">
                <Button variant="outline">Sign In</Button>
              </Link>
              <Link to="/admin">
                <Button variant="ghost" size="sm">Admin</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Pure Water Delivered
            <span className="block text-blue-600">To Your Doorstep</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Premium quality sachet and bottled water with fast, reliable delivery. 
            Order online and get fresh, clean water delivered within hours.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/customer-login">
              <Button size="lg" className="water-gradient text-lg px-8 py-3">
                Order Now
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="text-lg px-8 py-3">
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose AquaFlow?</h2>
          <div className="grid md:grid-cols-4 gap-8">
            <Card className="text-center">
              <CardHeader>
                <div className="w-12 h-12 water-gradient rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Droplets className="h-6 w-6 text-white" />
                </div>
                <CardTitle>Pure & Clean</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Premium filtered water that meets the highest quality standards
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="w-12 h-12 water-gradient rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Truck className="h-6 w-6 text-white" />
                </div>
                <CardTitle>Fast Delivery</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Same-day delivery available in most areas across Lagos
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="w-12 h-12 water-gradient rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <CardTitle>Quality Assured</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  NAFDAC approved with regular quality testing and certification
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="w-12 h-12 water-gradient rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Clock className="h-6 w-6 text-white" />
                </div>
                <CardTitle>24/7 Service</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Round-the-clock customer support and emergency water delivery
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Products</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Sachet Water</CardTitle>
                <CardDescription>Pure Water - 50cl sachets</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="text-2xl font-bold">XAF 20 <span className="text-sm font-normal text-muted-foreground">per sachet</span></p>
                  <p className="text-sm text-gray-600">Minimum order: 1 bag (20 sachets)</p>
                  <ul className="text-sm space-y-1">
                    <li>• NAFDAC Approved</li>
                    <li>• Fresh & Clean</li>
                    <li>• Affordable pricing</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Bottled Water</CardTitle>
                <CardDescription>Premium Bottled Water - 75cl</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="text-2xl font-bold">XAF 150 <span className="text-sm font-normal text-muted-foreground">per bottle</span></p>
                  <p className="text-sm text-gray-600">Minimum order: 12 bottles</p>
                  <ul className="text-sm space-y-1">
                    <li>• Premium Quality</li>
                    <li>• Recyclable Bottles</li>
                    <li>• Perfect for events</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Bulk Orders</CardTitle>
                <CardDescription>For Events & Offices</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="text-2xl font-bold">Custom <span className="text-sm font-normal text-muted-foreground">pricing</span></p>
                  <p className="text-sm text-gray-600">Wholesale rates available</p>
                  <ul className="text-sm space-y-1">
                    <li>• Volume discounts</li>
                    <li>• Flexible delivery</li>
                    <li>• Custom packaging</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">What Our Customers Say</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4">
                  "Excellent service! Always on time and the water quality is outstanding. 
                  AquaFlow has been our go-to for office water supply."
                </p>
                <div className="font-semibold">- Adebayo O., Lagos</div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4">
                  "Fast delivery and great customer service. I order weekly and they 
                  never disappoint. Highly recommended!"
                </p>
                <div className="font-semibold">- Funmi A., Ikeja</div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4">
                  "Clean, affordable water with reliable delivery. Perfect for our 
                  family needs. The online ordering system is very convenient."
                </p>
                <div className="font-semibold">- Michael T., Victoria Island</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 water-gradient text-white">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of satisfied customers enjoying fresh, clean water delivered to their doorstep
          </p>
          <Link to="/customer-login">
            <Button size="lg" variant="secondary" className="text-lg px-8 py-3">
              Create Your Account
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-xl water-gradient">
                  <Droplets className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="font-bold">AquaFlow</h3>
                  <p className="text-xs text-gray-400">Pure Water Delivery</p>
                </div>
              </div>
              <p className="text-gray-400 text-sm">
                Leading water distribution service in Lagos, Nigeria. 
                Committed to providing clean, safe water to every doorstep.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <div className="space-y-2 text-sm">
                <Link to="/customer-login" className="block text-gray-400 hover:text-white">Order Water</Link>
                <Link to="#" className="block text-gray-400 hover:text-white">Track Order</Link>
                <Link to="#" className="block text-gray-400 hover:text-white">Pricing</Link>
                <Link to="#" className="block text-gray-400 hover:text-white">About Us</Link>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <div className="space-y-2 text-sm">
                <a href="#" className="block text-gray-400 hover:text-white">Help Center</a>
                <a href="#" className="block text-gray-400 hover:text-white">Contact Support</a>
                <a href="#" className="block text-gray-400 hover:text-white">Terms of Service</a>
                <a href="#" className="block text-gray-400 hover:text-white">Privacy Policy</a>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Contact Info</h4>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  <span className="text-gray-400">+234 803 123 4567</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <span className="text-gray-400">Lagos, Nigeria</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>© 2024 AquaFlow. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
