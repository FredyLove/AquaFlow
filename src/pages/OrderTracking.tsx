/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, MapPin, Clock, Truck, CheckCircle, Package, User } from "lucide-react";

const baseURL = import.meta.env.VITE_BASE_URL;
const OrderTracking = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await fetch(`${baseURL}/delivery/track`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        const match = data.find((d) => d.id.toString() === orderId);
        if (match) {
          setOrder(match);

          const stepMap = {
            confirmed: 0,
            preparing: 1,
            out_for_delivery: 2,
            delivered: 3,
          };
          setCurrentStep(stepMap[match.stage]);
        }
      } catch (err) {
        console.error("Failed to load order:", err);
      }
    };

    fetchOrder();
  }, [orderId]);

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading order details...</p>
      </div>
    );
  }

  const trackingSteps = [
    {
      status: "Order Confirmed",
      description: "Your order has been received and confirmed",
      icon: CheckCircle,
    },
    {
      status: "Preparing Order",
      description: "We're preparing your water for delivery",
      icon: Package,
    },
    {
      status: "Out for Delivery",
      description: "Your order is on the way",
      icon: Truck,
    },
    {
      status: "Delivered",
      description: "Order delivered successfully",
      icon: CheckCircle,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link to="/customer-portal">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Portal
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold">Track Your Order</h1>
              <p className="text-gray-600">Order ID: {order.id}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Truck className="h-5 w-5 text-blue-600" />
                  Current Status
                </CardTitle>
                <CardDescription>
                  Estimated delivery: {order.estimated_delivery_time || "Unavailable"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {trackingSteps.map((step, index) => {
                    const Icon = step.icon;
                    const completed = index < currentStep;
                    const inProgress = index === currentStep;
                    return (
                      <div key={index} className="flex items-start gap-4">
                        <div className={`p-2 rounded-full ${
                          completed
                            ? 'bg-green-100 text-green-600'
                            : inProgress
                              ? 'bg-blue-100 text-blue-600 animate-pulse'
                              : 'bg-gray-100 text-gray-400'
                        }`}>
                          <Icon className="h-4 w-4" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h3 className={`font-medium ${
                              completed ? 'text-green-600' :
                              inProgress ? 'text-blue-600' : 'text-gray-400'
                            }`}>
                              {step.status}
                            </h3>
                            {completed && (
                              <Badge variant="secondary" className="bg-green-100 text-green-700">Completed</Badge>
                            )}
                            {inProgress && (
                              <Badge variant="secondary" className="bg-blue-100 text-blue-700">In Progress</Badge>
                            )}
                          </div>
                          <p className="text-sm text-gray-600 mt-1">{step.description}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {order.driver && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5 text-blue-600" />
                    Delivery Driver
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Driver:</span>
                      <span className="font-medium">{order.driver.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Phone:</span>
                      <span className="font-medium">{order.driver.phone}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Vehicle:</span>
                      <span className="font-medium">{order.driver.vehicle || "N/A"}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
                <CardDescription>Delivery ID: {order.id}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm">No breakdown available, total quantity: <strong>{order.quantity}</strong></p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-blue-600" />
                  Delivery Address
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-800">{order.address}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-blue-600" />
                  Estimated Delivery
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg font-semibold text-blue-600">
                  {order.estimated_delivery_time || "N/A"}
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  From confirmation time
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderTracking;
