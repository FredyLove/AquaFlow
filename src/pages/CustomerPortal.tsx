import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Droplets, User, Bell, Heart, ShoppingCart, Package, Bookmark, UserCircle, LogOut } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import NotificationBell from "./Customer/NotificationBell";
import AccountTab from "./Customer/AccountTab";
import ShopTab from "./Customer/ShopTab";
import OrdersTab from "./Customer/OrdersTab";
import CartTab from "./Customer/CartTab";


const CustomerPortal = () => {
  const [activeTab, setActiveTab] = useState("shop");
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [orders, setOrders] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate();

  const baseURL = import.meta.env.VITE_BASE_URL;

  const token = localStorage.getItem("token");
  const { toast } = useToast();

  useEffect(() => {
  fetch(`${baseURL}/products`)
    .then(res => res.json())
    .then(setProducts);
}, [baseURL]);

useEffect(() => {
  fetch(`${baseURL}/cart`, {
    headers: { Authorization: `Bearer ${token}` }
  })
    .then(res => res.json())
    .then(setCartItems);
}, [baseURL, token]);

useEffect(() => {
  fetch(`${baseURL}/delivery/track`, {
    headers: { Authorization: `Bearer ${token}` }
  })
    .then(res => res.json())
    .then(setOrders);

  fetch(`${baseURL}/notifications`, {
    headers: { Authorization: `Bearer ${token}` }
  })
    .then(res => res.json())
    .then(setNotifications);

  fetch(`${baseURL}/bookmarks`, {
    headers: { Authorization: `Bearer ${token}` }
  })
    .then(res => res.json())
    .then(setFavorites);

  fetch(`${baseURL}/users/profile`, {
    headers: { Authorization: `Bearer ${token}` }
  })
    .then(res => res.json())
    .then(setUserInfo);
}, [baseURL, token]);

  const handleAddToCart = async (product) => {
  try {
    const res = await fetch(`${baseURL}/cart/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        product_id: product.id,
        quantity: 1,
      }),
    });

    if (res.ok) {
      toast({ title: "Added to cart" });

      // 🔁 Refetch updated cart count
      const updatedCart = await fetch(`${baseURL}/cart`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await updatedCart.json();
      setCartItems(data); // ← update global state so badge updates
    } else {
      const err = await res.json();
      toast({ title: "Failed", description: err.detail || "Unable to add item" });
    }
  } catch (err) {
    toast({ title: "Error", description: "Server error" });
  }
};


const fetchCartItems = async () => {
  const res = await fetch(`${baseURL}/cart`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await res.json();
  setCartItems(data);
};


const handleRemoveFromCart = async (productId) => {
  try {
    const res = await fetch(`${baseURL}/cart/${productId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if (res.ok) {
      const updatedCart = await res.json();
      setCartItems(updatedCart);
    }
  } catch (err) {
    toast({ title: "Error", description: err.message });
  }
};


  const handleBookmark = async (productId) => {
    await fetch(`${baseURL}/bookmarks`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ product_id: productId })
    });
  };

const handleSendDeliveryRequest = async () => {
  const deliveryAddress = prompt("Enter delivery address:");

  if (!deliveryAddress) {
    toast({ title: "Address required" });
    return;
  }

  try {
    for (const item of cartItems) {
      const res = await fetch(`${baseURL}/delivery`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          product_id: item.id,
          quantity: 1, // or item.quantity
          address: deliveryAddress
        })
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.detail || "Failed to place order");
      }
    }
    // ✅ Clear cart in UI
    setCartItems([]);
    toast({ title: "Order placed!", description: "Track it in your orders." });
    setActiveTab("orders");
  } catch (error) {
    console.error("Checkout error:", error);
    toast({ title: "Checkout failed", description: error.message });
  }
};

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <nav className="bg-white shadow-sm border-b border-blue-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-gradient-to-br from-blue-500 to-teal-400">
                <Droplets className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-blue-800">AquaFlow Portal</h1>
                <p className="text-xs text-blue-600">Welcome back, {userInfo?.username}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">

              {/**Bell For Notifications */}
              <Button variant="ghost" size="icon" className="text-blue-600 hover:bg-blue-50 relative">
                <NotificationBell />
              </Button>
              <Link to="/">

                <Button variant="ghost" size="sm" className="text-blue-600 hover:bg-blue-50">
                  <LogOut className="h-4 w-4 mr-2" /> Logout
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 bg-blue-50">
            <TabsTrigger value="shop" className="flex items-center gap-2">
              <ShoppingCart className="h-4 w-4" /> Shop
            </TabsTrigger>
            <TabsTrigger value="orders" className="flex items-center gap-2">
              <Package className="h-4 w-4" /> Orders
            </TabsTrigger>
            <TabsTrigger value="cart" className="flex items-center gap-2">
              <ShoppingCart className="h-4 w-4" /> Cart <Badge className="bg-blue-500">{cartItems.length}</Badge>
            </TabsTrigger>
            <TabsTrigger value="favorites" className="flex items-center gap-2">
              <Bookmark className="h-4 w-4" /> Favorites
            </TabsTrigger>
            <TabsTrigger value="account" className="flex items-center gap-2">
              <UserCircle className="h-4 w-4" /> Account
            </TabsTrigger>
          </TabsList>

          <TabsContent value="shop" className="space-y-6">
            <ShopTab
              handleAddToCart={handleAddToCart}
              handleBookmark={handleBookmark}
            />
          </TabsContent>

          <TabsContent value="orders" className="space-y-4">
            <OrdersTab />
          </TabsContent>

          <TabsContent value="cart" className="space-y-4">
            <CartTab 
            setActiveTab={setActiveTab}
            cartItems={cartItems}
            setCartItems={setCartItems} 
            />
          </TabsContent>

          <TabsContent value="favorites" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-blue-800">Favorites</h2>
              <Badge variant="outline" className="text-blue-600 border-blue-200">
                {favorites.length} items
              </Badge>
            </div>
            {favorites.length === 0 ? (
              <Card className="border-blue-100">
                <CardContent className="p-8 text-center">
                  <Heart className="h-10 w-10 mx-auto text-blue-400 mb-4" />
                  <h3 className="text-lg font-medium text-blue-800">No favorites yet</h3>
                  <p className="text-sm text-gray-500 mt-2">Save your favorite products here</p>
                  <Button 
                    className="mt-4 bg-blue-600 hover:bg-blue-700"
                    onClick={() => setActiveTab("shop")}
                  >
                    Browse Products
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid md:grid-cols-2 gap-4">
                {favorites.map(p => (
                  <Card key={p.id} className="border-blue-100">
                    <CardContent className="p-6">
                      <div className="flex justify-between">
                        <div>
                          <h3 className="font-medium text-blue-900">{p.name}</h3>
                          <p className="text-sm text-gray-600 mt-1">{p.description}</p>
                        </div>
                        <span className="font-bold text-blue-700">XAF {p.price}</span>
                      </div>
                      <div className="flex gap-2 mt-4">
                        <Button 
                          variant="outline" 
                          className="border-blue-200 text-blue-600 hover:bg-blue-50 flex-1"
                          onClick={() => setActiveTab("shop")}
                        >
                          View Product
                        </Button>
                        <Button 
                          className="bg-blue-600 hover:bg-blue-700"
                          onClick={() => handleAddToCart(p)}
                        >
                          Add to Cart
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

          </TabsContent>
          <TabsContent value="account" className="space-y-4">
            <AccountTab/>

          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default CustomerPortal;