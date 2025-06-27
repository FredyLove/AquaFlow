
import { Outlet, Link } from "react-router-dom";
import { AppSidebar } from "./AppSidebar";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { HomeIcon } from "lucide-react";

const Layout = () => {
  return (
    <div className="min-h-screen flex w-full">
      <AppSidebar />
      <main className="flex-1 flex flex-col">
        <header className="border-b bg-white p-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <SidebarTrigger />
            <h1 className="text-xl font-semibold">Water Distribution Management System</h1>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/">
              <Button variant="outline" className="flex items-center gap-2">
                <HomeIcon className="h-4 w-4" />
                Home Page
              </Button>
            </Link>
          </div>
        </header>
        <div className="flex-1 p-6 bg-gray-50">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;
