
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, AreaChart, Area } from "recharts";
import { FileText, Download, TrendingUp, Calendar, BarChart3 } from "lucide-react";

const Reports = () => {
  // Mock data for charts
  const monthlyRevenue = [
    { month: 'Jan', revenue: 1850000, orders: 245, customers: 45 },
    { month: 'Feb', revenue: 2100000, orders: 280, customers: 52 },
    { month: 'Mar', revenue: 2450000, orders: 325, customers: 68 },
    { month: 'Apr', revenue: 2200000, orders: 295, customers: 61 },
    { month: 'May', revenue: 2800000, orders: 375, customers: 78 },
    { month: 'Jun', revenue: 3100000, orders: 420, customers: 89 },
  ];

  const productSales = [
    { product: 'Pure Life Sachets', sales: 45000, revenue: 1800000 },
    { product: 'Eva Bottles 75cl', sales: 18000, revenue: 4320000 },
    { product: 'Aquafina 1.5L', sales: 12000, revenue: 4200000 },
    { product: 'Ragolis Sachets', sales: 38000, revenue: 1330000 },
    { product: 'Table Water 50cl', sales: 25000, revenue: 4500000 },
  ];

  const customerSegments = [
    { name: 'Retailers', value: 65, color: '#0ea5e9' },
    { name: 'Wholesalers', value: 25, color: '#0284c7' },
    { name: 'Individuals', value: 10, color: '#0369a1' },
  ];

  const weeklyDeliveries = [
    { day: 'Mon', delivered: 45, pending: 8, delayed: 2 },
    { day: 'Tue', delivered: 52, pending: 12, delayed: 1 },
    { day: 'Wed', delivered: 48, pending: 6, delayed: 3 },
    { day: 'Thu', delivered: 61, pending: 9, delayed: 0 },
    { day: 'Fri', delivered: 58, pending: 15, delayed: 4 },
    { day: 'Sat', delivered: 42, pending: 5, delayed: 1 },
    { day: 'Sun', delivered: 35, pending: 3, delayed: 0 },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Reports & Analytics</h1>
          <p className="text-muted-foreground">Business insights and performance metrics</p>
        </div>
        <div className="flex gap-2">
          <Select defaultValue="6months">
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1month">Last Month</SelectItem>
              <SelectItem value="3months">Last 3 Months</SelectItem>
              <SelectItem value="6months">Last 6 Months</SelectItem>
              <SelectItem value="1year">Last Year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Key Performance Indicators */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">XAF 14.5M</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <TrendingUp className="h-3 w-3 text-green-500" />
              +23.5% from last period
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Order Value</CardTitle>
            <BarChart3 className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">XAF 58,450</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <TrendingUp className="h-3 w-3 text-green-500" />
              +8.2% from last period
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Customer Retention</CardTitle>
            <Calendar className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">89.2%</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <TrendingUp className="h-3 w-3 text-green-500" />
              +4.1% from last period
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Delivery Success Rate</CardTitle>
            <FileText className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">96.8%</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <TrendingUp className="h-3 w-3 text-green-500" />
              +2.3% from last period
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Revenue and Orders Trend */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Revenue Trend</CardTitle>
            <CardDescription>Monthly revenue growth over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={monthlyRevenue}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => [`XAF ${value.toLocaleString()}`, 'Revenue']} />
                <Area type="monotone" dataKey="revenue" stroke="#0ea5e9" fill="#0ea5e9" fillOpacity={0.3} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Orders & Customers</CardTitle>
            <CardDescription>Monthly orders and new customers acquired</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyRevenue}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="orders" stroke="#0ea5e9" strokeWidth={2} name="Orders" />
                <Line type="monotone" dataKey="customers" stroke="#0284c7" strokeWidth={2} name="New Customers" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Product Performance and Customer Segments */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Top Products by Revenue</CardTitle>
            <CardDescription>Best performing products this period</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={productSales} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="product" type="category" width={100} />
                <Tooltip formatter={(value) => [`XAF ${value.toLocaleString()}`, 'Revenue']} />
                <Bar dataKey="revenue" fill="#0ea5e9" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Customer Segments</CardTitle>
            <CardDescription>Distribution of customer types</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={customerSegments}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  {customerSegments.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Weekly Delivery Performance */}
      <Card>
        <CardHeader>
          <CardTitle>Weekly Delivery Performance</CardTitle>
          <CardDescription>Daily delivery status breakdown for the current week</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={weeklyDeliveries}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="delivered" fill="#10b981" name="Delivered" />
              <Bar dataKey="pending" fill="#f59e0b" name="Pending" />
              <Bar dataKey="delayed" fill="#ef4444" name="Delayed" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Quick Reports */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Reports</CardTitle>
          <CardDescription>Generate and download detailed reports</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
              <h3 className="font-semibold mb-2">Sales Report</h3>
              <p className="text-sm text-muted-foreground mb-3">Comprehensive sales analysis with product breakdown</p>
              <Button variant="outline" size="sm" className="w-full">
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
            </div>
            
            <div className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
              <h3 className="font-semibold mb-2">Customer Report</h3>
              <p className="text-sm text-muted-foreground mb-3">Customer analytics and purchase behavior</p>
              <Button variant="outline" size="sm" className="w-full">
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
            </div>
            
            <div className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
              <h3 className="font-semibold mb-2">Inventory Report</h3>
              <p className="text-sm text-muted-foreground mb-3">Stock levels and inventory movement analysis</p>
              <Button variant="outline" size="sm" className="w-full">
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Reports;
