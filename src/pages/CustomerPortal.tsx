import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Droplets, User } from "lucide-react";
import { Link } from "react-router-dom";

const CustomerPortal = () => {
  const [activeTab, setActiveTab] = useState("shop");
  const [cartItems, setCartItems] = useState([]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl water-gradient">
                <Droplets className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold">AquaFlow Portal</h1>
                <p className="text-xs text-muted-foreground">Welcome back, John!</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Link to="/track/ORD-001">
                <Button variant="outline" size="sm">
                  Track Order
                </Button>
              </Link>
              <Link to="/">
                <Button variant="ghost" size="sm">
                  <User className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="shop">Shop</TabsTrigger>
            <TabsTrigger value="orders">My Orders</TabsTrigger>
            <TabsTrigger value="cart">Cart ({cartItems.length})</TabsTrigger>
            <TabsTrigger value="account">Account</TabsTrigger>
          </TabsList>

          {/* Shop Tab */}
          <TabsContent value="shop" className="space-y-6">
            <h2 className="text-2xl font-bold">Shop for Water</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-semibold">Sachet Water</h3>
                  <p className="text-sm text-gray-600">Pure Water - 50cl sachets</p>
                  <p className="text-lg font-bold mt-2">XAF 20 <span className="text-sm font-normal text-muted-foreground">per sachet</span></p>
                  <Button className="w-full mt-4" onClick={() => setCartItems(prev => [...prev, { name: "Sachet Water", price: 20 }])}>
                    Add to Cart
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <h3 className="font-semibold">Bottled Water</h3>
                  <p className="text-sm text-gray-600">Premium Bottled Water - 75cl</p>
                  <p className="text-lg font-bold mt-2">XAF 150 <span className="text-sm font-normal text-muted-foreground">per bottle</span></p>
                  <Button className="w-full mt-4" onClick={() => setCartItems(prev => [...prev, { name: "Bottled Water", price: 150 }])}>
                    Add to Cart
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <h3 className="font-semibold">Bulk Orders</h3>
                  <p className="text-sm text-gray-600">For Events & Offices</p>
                  <p className="text-lg font-bold mt-2">Custom <span className="text-sm font-normal text-muted-foreground">pricing</span></p>
                  <Button className="w-full mt-4" variant="outline">
                    Contact Us
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Orders Tab */}
          <TabsContent value="orders" className="space-y-4">
            <h2 className="text-2xl font-bold">My Orders</h2>
            <div className="grid gap-4">
              {[
                { id: "ORD-001", date: "2024-01-15", status: "Out for Delivery", total: 1300, items: "2 items" },
                { id: "ORD-002", date: "2024-01-10", status: "Delivered", total: 800, items: "1 item" },
                { id: "ORD-003", date: "2024-01-05", status: "Delivered", total: 1500, items: "3 items" }
              ].map((order) => (
                <Card key={order.id}>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold">Order #{order.id}</h3>
                        <p className="text-sm text-gray-600">{order.date} • {order.items}</p>
                        <Badge 
                          variant={order.status === "Delivered" ? "secondary" : "default"}
                          className="mt-2"
                        >
                          {order.status}
                        </Badge>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">XAF {order.total}</p>
                        <div className="flex gap-2 mt-2">
                          <Link to={`/track/${order.id}`}>
                            <Button size="sm" variant="outline">
                              Track Order
                            </Button>
                          </Link>
                          <Button size="sm" variant="ghost">
                            Reorder
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Cart Tab */}
          <TabsContent value="cart" className="space-y-4">
            <h2 className="text-2xl font-bold">Shopping Cart</h2>
            {cartItems.length === 0 ? (
              <p>Your cart is empty.</p>
            ) : (
              <div className="space-y-3">
                {cartItems.map((item, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span>{item.name}</span>
                    <span>XAF {item.price}</span>
                  </div>
                ))}
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>XAF {cartItems.reduce((acc, item) => acc + item.price, 0)}</span>
                </div>
                <Button>Checkout</Button>
              </div>
            )}
          </TabsContent>

          {/* Account Tab */}
          <TabsContent value="account" className="space-y-4">
            <h2 className="text-2xl font-bold">Account Information</h2>
            <Card>
              <CardContent className="p-6">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Name:</span>
                    <span className="font-medium">John Doe</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Email:</span>
                    <span className="font-medium">john.doe@example.com</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Phone:</span>
                    <span className="font-medium">+234 803 123 4567</span>
                  </div>
                  <Button variant="outline">Update Profile</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default CustomerPortal;
