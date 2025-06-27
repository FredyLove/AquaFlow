/* eslint-disable react-hooks/exhaustive-deps */

import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, MapPin, Clock, Truck, CheckCircle, Package, User } from "lucide-react";

const OrderTracking = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);

  // Mock order data
  const mockOrder = {
    id: orderId || "ORD-001",
    customerName: "John Doe",
    customerPhone: "+234 803 123 4567",
    deliveryAddress: "123 Victoria Island, Lagos, Nigeria",
    items: [
      { name: "Pure Water Sachets", quantity: 2, price: 400 },
      { name: "Bottled Water (75cl)", quantity: 6, price: 900 }
    ],
    total: 1300,
    estimatedDelivery: "30-45 minutes",
    driverName: "Ahmed Hassan",
    driverPhone: "+234 801 987 6543",
    plateNumber: "LAG 456 XY"
  };

  const trackingSteps = [
    { 
      status: "Order Confirmed", 
      description: "Your order has been received and confirmed",
      icon: CheckCircle,
      completed: true 
    },
    { 
      status: "Preparing Order", 
      description: "We're preparing your water for delivery",
      icon: Package,
      completed: currentStep >= 1 
    },
    { 
      status: "Out for Delivery", 
      description: "Your order is on the way",
      icon: Truck,
      completed: currentStep >= 2 
    },
    { 
      status: "Delivered", 
      description: "Order delivered successfully",
      icon: CheckCircle,
      completed: currentStep >= 3 
    }
  ];

  useEffect(() => {
    setOrder(mockOrder);
    
    // Simulate real-time tracking updates
    const interval = setInterval(() => {
      setCurrentStep(prev => {
        if (prev < 3) return prev + 1;
        clearInterval(interval);
        return prev;
      });
    }, 10000); // Update every 10 seconds for demo

    return () => clearInterval(interval);
  }, []);

  if (!order) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>Loading order details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
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
          {/* Order Tracking */}
          <div className="lg:col-span-2 space-y-6">
            {/* Current Status */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Truck className="h-5 w-5 text-blue-600" />
                  Current Status
                </CardTitle>
                <CardDescription>
                  Estimated delivery: {order.estimatedDelivery}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {trackingSteps.map((step, index) => {
                    const Icon = step.icon;
                    return (
                      <div key={index} className="flex items-start gap-4">
                        <div className={`p-2 rounded-full ${
                          step.completed 
                            ? 'bg-green-100 text-green-600' 
                            : index === currentStep 
                              ? 'bg-blue-100 text-blue-600 animate-pulse' 
                              : 'bg-gray-100 text-gray-400'
                        }`}>
                          <Icon className="h-4 w-4" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h3 className={`font-medium ${
                              step.completed ? 'text-green-600' : 
                              index === currentStep ? 'text-blue-600' : 'text-gray-400'
                            }`}>
                              {step.status}
                            </h3>
                            {step.completed && (
                              <Badge variant="secondary" className="bg-green-100 text-green-700">
                                Completed
                              </Badge>
                            )}
                            {index === currentStep && !step.completed && (
                              <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                                In Progress
                              </Badge>
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

            {/* Delivery Info */}
            {currentStep >= 2 && (
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
                      <span className="font-medium">{order.driverName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Phone:</span>
                      <span className="font-medium">{order.driverPhone}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Vehicle:</span>
                      <span className="font-medium">{order.plateNumber}</span>
                    </div>
                    <Button className="w-full mt-4" variant="outline">
                      <span>Call Driver</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
                <CardDescription>Order #{order.id}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {order.items.map((item, index) => (
                    <div key={index} className="flex justify-between text-sm">
                      <span>{item.quantity}x {item.name}</span>
                      <span>XAF {item.price}</span>
                    </div>
                  ))}
                  <Separator />
                  <div className="flex justify-between font-semibold">
                    <span>Total</span>
                    <span>XAF {order.total}</span>
                  </div>
                </div>
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
                <div className="space-y-2">
                  <p className="font-medium">{order.customerName}</p>
                  <p className="text-sm text-gray-600">{order.deliveryAddress}</p>
                  <p className="text-sm text-gray-600">{order.customerPhone}</p>
                </div>
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
                  {order.estimatedDelivery}
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  From time of order confirmation
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
