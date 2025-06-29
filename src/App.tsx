
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import Layout from "./components/Layout";
import Dashboard from "./pages/Admin/Dashboard";
import Inventory from "./pages/Admin/Inventory";
import Orders from "./pages/Admin/Orders";
import Customers from "./pages/Admin/Customers";
import Delivery from "./pages/Admin/Delivery";
import Reports from "./pages/Admin/Reports";
import CustomerLogin from "./pages/CustomerLogin";
import CustomerPortal from "./pages/CustomerPortal";
import OrderTracking from "./pages/OrderTracking";
import ProductReviewsPage from "./pages/Customer/ProductReviews"
import NotFound from "./pages/NotFound";
import Landing from "./pages/Landing";
import ProtectedRoute from "./components/ProtectedRoute";

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
          <Route path="/track/:orderId" element={<OrderTracking />} />
          <Route path="/products/:productId" element={<ProductReviewsPage />} />

          
          {/* Admin Routes */}
          <Route path="/admin" element={
            <SidebarProvider>
              <Layout />
            </SidebarProvider>
          }>
            <Route index element={<Dashboard />} />
            <Route path="inventory" element={<Inventory />} />
            <Route path="orders" element={<Orders />} />
            <Route path="customers" element={<Customers />} />
            <Route path="delivery" element={<Delivery />} />
            <Route path="reports" element={<Reports />} />
          </Route>
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
