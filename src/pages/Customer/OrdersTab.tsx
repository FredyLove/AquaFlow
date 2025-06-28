/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TabsContent } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Package } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const baseURL = import.meta.env.VITE_BASE_URL;

const OrdersTab = () => {
  const [orders, setOrders] = useState([]);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch(`${baseURL}/delivery/track`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        setOrders(data);
      } catch (err) {
        toast({ title: "Error", description: "Failed to load orders" });
      }
    };

    fetchOrders();
  }, []);

  return (
    <TabsContent value="orders" className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-blue-800">My Orders</h2>
        <Badge variant="outline" className="text-blue-600 border-blue-200">
          {orders.length} orders
        </Badge>
      </div>

      {orders.length === 0 ? (
        <Card className="border-blue-100">
          <CardContent className="p-8 text-center">
            <Package className="h-10 w-10 mx-auto text-blue-400 mb-4" />
            <h3 className="text-lg font-medium text-blue-800">No orders yet</h3>
            <p className="text-sm text-gray-500 mt-2">Your order history will appear here</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <Card key={order.id} className="border-blue-100">
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-blue-900">Order #{order.id}</h3>
                    <p className="text-sm text-gray-600 mt-1">{order.address}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge
                        className="mt-3"
                        variant={order.stage === "delivered" ? "default" : "secondary"}
                      >
                        {order.stage}
                      </Badge>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-blue-200 text-blue-600 hover:bg-blue-50 h-8"
                        onClick={() => navigate(`/track/${order.id}`)}
                      >
                        Track Order
                      </Button>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-blue-700">XAF {order.quantity * 100}</p>
                    <p className="text-sm text-gray-500 mt-1">Qty: {order.quantity}</p>
                    <p className="text-xs text-gray-400 mt-1">
                      {new Date(order.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </TabsContent>
  );
};

export default OrdersTab;
