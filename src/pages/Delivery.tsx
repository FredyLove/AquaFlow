
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Truck, MapPin, Clock, CheckCircle, AlertCircle, Calendar } from "lucide-react";

const Delivery = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const deliveries = [
    {
      id: "DEL-001",
      orderId: "ORD-001",
      customer: "SuperMart Lagos",
      driver: "Ibrahim Musa",
      vehicle: "LG-789-ABC",
      route: "Victoria Island Route",
      status: "In Transit",
      scheduledTime: "09:00 AM",
      estimatedArrival: "10:30 AM",
      items: "500 Sachets, 100 Bottles",
      distance: "12.5 km",
      progress: 65
    },
    {
      id: "DEL-002",
      orderId: "ORD-002",
      customer: "Fresh Foods Abuja",
      driver: "Fatima Ali",
      vehicle: "AB-456-XYZ",
      route: "Central District Route",
      status: "Delivered",
      scheduledTime: "08:00 AM",
      estimatedArrival: "09:45 AM",
      items: "300 Bottles",
      distance: "8.2 km",
      progress: 100
    },
    {
      id: "DEL-003",
      orderId: "ORD-003",
      customer: "City Store Kano",
      driver: "Ahmed Bello",
      vehicle: "KN-234-DEF",
      route: "Sabon Gari Route",
      status: "Pending",
      scheduledTime: "02:00 PM",
      estimatedArrival: "03:30 PM",
      items: "800 Sachets",
      distance: "15.8 km",
      progress: 0
    },
    {
      id: "DEL-004",
      orderId: "ORD-004",
      customer: "Metro Mall PH",
      driver: "Grace Okoro",
      vehicle: "PH-567-GHI",
      route: "GRA Route",
      status: "Delayed",
      scheduledTime: "11:00 AM",
      estimatedArrival: "01:15 PM",
      items: "200 Bottles, 400 Sachets",
      distance: "20.3 km",
      progress: 40
    },
    {
      id: "DEL-005",
      orderId: "ORD-005",
      customer: "Corner Shop Lagos",
      driver: "Emeka Okafor",
      vehicle: "LG-890-JKL",
      route: "Ikeja Route",
      status: "In Transit",
      scheduledTime: "01:00 PM",
      estimatedArrival: "02:20 PM",
      items: "150 Bottles",
      distance: "9.7 km",
      progress: 75
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Delivered': return 'bg-green-100 text-green-800';
      case 'In Transit': return 'bg-blue-100 text-blue-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Delayed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Delivered': return <CheckCircle className="h-4 w-4" />;
      case 'In Transit': return <Truck className="h-4 w-4" />;
      case 'Pending': return <Clock className="h-4 w-4" />;
      case 'Delayed': return <AlertCircle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const filteredDeliveries = deliveries.filter(delivery => {
    const matchesSearch = delivery.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         delivery.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         delivery.driver.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || delivery.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalDeliveries = deliveries.length;
  const inTransitCount = deliveries.filter(d => d.status === 'In Transit').length;
  const deliveredToday = deliveries.filter(d => d.status === 'Delivered').length;
  const delayedCount = deliveries.filter(d => d.status === 'Delayed').length;

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold">Delivery Management</h1>
        <p className="text-muted-foreground">Track and manage delivery operations</p>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Deliveries</CardTitle>
            <Truck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalDeliveries}</div>
            <p className="text-xs text-muted-foreground">Today's schedule</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Transit</CardTitle>
            <Truck className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{inTransitCount}</div>
            <p className="text-xs text-muted-foreground">Currently on route</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Delivered</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{deliveredToday}</div>
            <p className="text-xs text-muted-foreground">Completed today</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Delayed</CardTitle>
            <AlertCircle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{delayedCount}</div>
            <p className="text-xs text-muted-foreground">Need attention</p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Delivery Tracking</CardTitle>
              <CardDescription>Monitor real-time delivery status and routes</CardDescription>
            </div>
            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search deliveries..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8 w-64"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="In Transit">In Transit</SelectItem>
                  <SelectItem value="Delivered">Delivered</SelectItem>
                  <SelectItem value="Delayed">Delayed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredDeliveries.map((delivery) => (
              <div key={delivery.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-lg">{delivery.customer}</h3>
                      <Badge className={getStatusColor(delivery.status)}>
                        {getStatusIcon(delivery.status)}
                        {delivery.status}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-muted-foreground">
                      <div>Order ID: {delivery.orderId}</div>
                      <div>Delivery ID: {delivery.id}</div>
                      <div>Driver: {delivery.driver}</div>
                      <div>Vehicle: {delivery.vehicle}</div>
                    </div>
                  </div>
                  
                  <Button variant="outline" size="sm">
                    <MapPin className="h-4 w-4 mr-1" />
                    Track
                  </Button>
                </div>

                {/* Progress Bar for In Transit deliveries */}
                {delivery.status === 'In Transit' && (
                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-1">
                      <span>Delivery Progress</span>
                      <span>{delivery.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="water-gradient h-2 rounded-full transition-all duration-300" 
                        style={{ width: `${delivery.progress}%` }}
                      ></div>
                    </div>
                  </div>
                )}
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-3 border-t">
                  <div>
                    <p className="text-sm text-muted-foreground">Route</p>
                    <p className="font-medium">{delivery.route}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Distance</p>
                    <p className="font-medium">{delivery.distance}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Scheduled</p>
                    <p className="font-medium">{delivery.scheduledTime}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">ETA</p>
                    <p className="font-medium">{delivery.estimatedArrival}</p>
                  </div>
                </div>
                
                <div className="mt-3 pt-3 border-t">
                  <p className="text-sm text-muted-foreground">Items: {delivery.items}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Delivery;
