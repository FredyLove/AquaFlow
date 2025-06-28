/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const baseURL = import.meta.env.VITE_BASE_URL;

const CartTab = ({ setActiveTab, cartItems, setCartItems }) => {
  const token = localStorage.getItem("token");
  // 🧠 Fetch cart on load
  const fetchCart = async () => {
    try {
      const res = await fetch(`${baseURL}/cart`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setCartItems(data);
    } catch (err) {
      toast({ title: "Failed to load cart" });
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  // ❌ Remove item
  const handleRemoveFromCart = async (productId) => {
  try {
    const res = await fetch(`${baseURL}/cart/${productId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    if (res.ok) {
      toast({ title: "Removed from cart" });
      fetchCart(); // ✅ Refresh
    } else {
      toast({ title: "Failed to remove item" });
    }
  } catch (err) {
    toast({ title: "Error removing item" });
  }
};


  // 🚚 Send delivery requests
  const handleSendDeliveryRequest = async () => {
    const address = prompt("Enter delivery address:");
    if (!address) {
      toast({ title: "Address required" });
      return;
    }

    try {
      for (const item of cartItems) {
        const res = await fetch(`${baseURL}/delivery`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            product_id: item.product.id,
            quantity: item.quantity,
            address,
          }),
        });

        if (!res.ok) {
          const err = await res.json();
          throw new Error(err.detail || "Failed to send request");
        }
      }

     // ✅ Clear cart on backend
    await fetch(`${baseURL}/cart/clear`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

      setCartItems([]);
      setActiveTab("orders");
      toast({ title: "Delivery request sent!" });
    } catch (err) {
      toast({ title: "Checkout failed", description: err.message });
    }
  };

  const totalPrice = cartItems.reduce((acc, item) => {
  if (item?.product && item.product.price) {
    return acc + item.product.price * item.quantity;
  }
  return acc;
}, 0);


  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-blue-800">Your Cart</h2>
        <Badge variant="outline" className="text-blue-600 border-blue-200">
          {cartItems.length} items
        </Badge>
      </div>

      {cartItems.length === 0 ? (
        <Card className="border-blue-100">
          <CardContent className="p-8 text-center">
            <ShoppingCart className="h-10 w-10 mx-auto text-blue-400 mb-4" />
            <h3 className="text-lg font-medium text-blue-800">Your cart is empty</h3>
            <p className="text-sm text-gray-500 mt-2">Add products to get started</p>
            <Button className="mt-4 bg-blue-600 hover:bg-blue-700" onClick={() => setActiveTab("shop")}>
              Browse Products
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Card className="border-blue-100">
          <CardContent className="p-6 space-y-4">
            {cartItems.map((item) => (
              <div key={item.product.id} className="flex justify-between items-center pb-3 border-b border-blue-50">
                <div>
                  <p className="font-medium text-blue-900">{item.product.name}</p>
                  <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                </div>
                <div className="text-right">
                  <p className="text-blue-700 font-semibold">
                    XAF {item.product.price * item.quantity}
                  </p>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-red-500"
                    onClick={() => handleRemoveFromCart(item.product.id)}
                  >
                    Remove
                  </Button>
                </div>
              </div>
            ))}

            <div className="flex justify-between font-bold pt-2">
              <span className="text-blue-900">Total</span>
              <span className="text-blue-700">XAF {totalPrice}</span>
            </div>

            <Button
              className="w-full mt-4 bg-blue-600 hover:bg-blue-700"
              onClick={handleSendDeliveryRequest}
            >
              Send Delivery Request
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CartTab;
