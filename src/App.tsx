
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Inventory from "./pages/Inventory";
import Orders from "./pages/Orders";
import Customers from "./pages/Customers";
import Delivery from "./pages/Delivery";
import Reports from "./pages/Reports";
import CustomerLogin from "./pages/CustomerLogin";
import CustomerPortal from "./pages/CustomerPortal";
import OrderTracking from "./pages/OrderTracking";
import NotFound from "./pages/NotFound";
import Landing from "./pages/Landing";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Landing />} />
          <Route path="/customer-login" element={<CustomerLogin />} />
          <Route path="/customer-portal" element={<CustomerPortal />} />
          <Route path="/track/ORD-001" element={<OrderTracking/>} />

          
          {/* Admin Routes */}
          <Route path="/admin" element={
            <SidebarProvider>
              <Layout />
            </SidebarProvider>
          }>
            <Route index element={<Dashboard />} />
            <Route path="admin/inventory" element={<Inventory />} />
            <Route path="admin/orders" element={<Orders />} />
            <Route path="admin/customers" element={<Customers />} />
            <Route path="admin/delivery" element={<Delivery />} />
            <Route path="admin/reports" element={<Reports />} />
          </Route>
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
