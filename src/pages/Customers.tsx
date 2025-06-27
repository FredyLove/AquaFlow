
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Search, Users, Phone, Mail, MapPin, Eye, Edit } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Customers = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const customers = [
    {
      id: 1,
      name: "SuperMart Lagos",
      email: "orders@supermart.ng",
      phone: "+234 801 234 5678",
      address: "Plot 123, Victoria Island, Lagos",
      type: "Retailer",
      status: "Active",
      totalOrders: 45,
      totalSpent: 2250000,
      lastOrder: "2024-06-23",
      joinDate: "2023-01-15"
    },
    {
      id: 2,
      name: "Fresh Foods Abuja",
      email: "procurement@freshfoods.ng",
      phone: "+234 803 456 7890",
      address: "Central Business District, Abuja",
      type: "Wholesaler",
      status: "Active",
      totalOrders: 32,
      totalSpent: 1680000,
      lastOrder: "2024-06-22",
      joinDate: "2023-03-10"
    },
    {
      id: 3,
      name: "City Store Kano",
      email: "citystore@gmail.com",
      phone: "+234 805 678 9012",
      address: "Sabon Gari, Kano State",
      type: "Retailer",
      status: "Active",
      totalOrders: 28,
      totalSpent: 980000,
      lastOrder: "2024-06-21",
      joinDate: "2023-05-20"
    },
    {
      id: 4,
      name: "Metro Mall PH",
      email: "supplies@metromall.ng",
      phone: "+234 807 890 1234",
      address: "GRA Phase 2, Port Harcourt",
      type: "Wholesaler",
      status: "Inactive",
      totalOrders: 15,
      totalSpent: 720000,
      lastOrder: "2024-05-18",
      joinDate: "2023-08-05"
    },
    {
      id: 5,
      name: "Corner Shop Lagos",
      email: "corner.shop@yahoo.com",
      phone: "+234 809 012 3456",
      address: "Ikeja, Lagos State",
      type: "Retailer",
      status: "Active",
      totalOrders: 12,
      totalSpent: 420000,
      lastOrder: "2024-06-20",
      joinDate: "2024-01-12"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Inactive': return 'bg-red-100 text-red-800';
      case 'Suspended': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Retailer': return 'bg-blue-100 text-blue-800';
      case 'Wholesaler': return 'bg-purple-100 text-purple-800';
      case 'Individual': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.phone.includes(searchTerm) ||
    customer.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalCustomers = customers.length;
  const activeCustomers = customers.filter(customer => customer.status === 'Active').length;
  const totalRevenue = customers.reduce((sum, customer) => sum + customer.totalSpent, 0);

  const handleAddCustomer = () => {
    toast({
      title: "Customer Added",
      description: "New customer has been added successfully.",
    });
    setIsAddDialogOpen(false);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Customer Management</h1>
          <p className="text-muted-foreground">Manage your customer relationships and data</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="water-gradient">
              <Plus className="mr-2 h-4 w-4" />
              Add Customer
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Customer</DialogTitle>
              <DialogDescription>
                Add a new customer to your database.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">Name</Label>
                <Input id="name" className="col-span-3" placeholder="Customer name" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">Email</Label>
                <Input id="email" type="email" className="col-span-3" placeholder="customer@email.com" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="phone" className="text-right">Phone</Label>
                <Input id="phone" className="col-span-3" placeholder="+234 xxx xxx xxxx" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="type" className="text-right">Type</Label>
                <Select>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select customer type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="retailer">Retailer</SelectItem>
                    <SelectItem value="wholesaler">Wholesaler</SelectItem>
                    <SelectItem value="individual">Individual</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="address" className="text-right">Address</Label>
                <Input id="address" className="col-span-3" placeholder="Customer address" />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>Cancel</Button>
              <Button onClick={handleAddCustomer} className="water-gradient">Add Customer</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCustomers}</div>
            <p className="text-xs text-muted-foreground">Registered customers</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Customers</CardTitle>
            <Users className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{activeCustomers}</div>
            <p className="text-xs text-muted-foreground">Currently active</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <Users className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">XAF {totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">From all customers</p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Customer List */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Customers</CardTitle>
              <CardDescription>Manage your customer database and relationships</CardDescription>
            </div>
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search customers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8 w-64"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredCustomers.map((customer) => (
              <div key={customer.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-lg">{customer.name}</h3>
                      <Badge className={getTypeColor(customer.type)}>{customer.type}</Badge>
                      <Badge className={getStatusColor(customer.status)}>{customer.status}</Badge>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4" />
                        {customer.email}
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4" />
                        {customer.phone}
                      </div>
                      <div className="flex items-center gap-2 md:col-span-2">
                        <MapPin className="h-4 w-4" />
                        {customer.address}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </Button>
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-3 border-t">
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">Total Orders</p>
                    <p className="text-lg font-semibold">{customer.totalOrders}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">Total Spent</p>
                    <p className="text-lg font-semibold">XAF {customer.totalSpent.toLocaleString()}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">Last Order</p>
                    <p className="text-lg font-semibold">{customer.lastOrder}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">Member Since</p>
                    <p className="text-lg font-semibold">{customer.joinDate}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Customers;
