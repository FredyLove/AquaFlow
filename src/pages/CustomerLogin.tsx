import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Droplets, Phone, User, MapPin, Lock, Mail, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Link, useNavigate } from "react-router-dom";

const baseURL = import.meta.env.VITE_BASE_URL;

const CustomerLogin = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("login");

  // Login state
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // Register state
  const [registerName, setRegisterName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsLoading(true);

  const form = new FormData();
  form.append("username", loginEmail);
  form.append("password", loginPassword);

  try {
    const res = await fetch(`${baseURL}/login`, {
      method: "POST",
      body: form,
    });

    const data = await res.json();

    if (res.ok) {
      toast({
        title: "Login Successful",
        description: "Welcome back to AquaFlow!",
      });

      // ✅ Save token and full user object
      localStorage.setItem("token", data.access_token);
      localStorage.setItem("user", JSON.stringify(data.user)); // ✅ Properly save the user

      // ✅ Redirect by role
      if (data.user.role === "admin") {
        navigate("/admin");
      } else if (data.user.role === "user") {
        navigate("/customer-portal");
      } else {
        toast({ title: "Unknown role", description: data.user.role });
      }
    } else {
      toast({
        title: "Login Failed",
        description: data.detail || "Invalid credentials",
        variant: "destructive",
      });
    }
  } catch (err) {
    toast({
      title: "Error",
      description: "Something went wrong. Please try again.",
      variant: "destructive",
    });
  } finally {
    setIsLoading(false);
  }
};
;

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!registerName || !registerEmail || !registerPassword || !confirmPassword) {
      toast({ 
        title: "All fields are required",
        variant: "destructive",
      });
      return;
    }

    if (registerPassword !== confirmPassword) {
      toast({ 
        title: "Passwords do not match",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    const body = {
      username: registerName,
      email: registerEmail,
      password: registerPassword,
      role: "user"
    };

    try {
      const res = await fetch("${baseURL}/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (res.ok) {
        toast({
          title: "Registration Successful",
          description: "Your account has been created successfully!",
        });
        setActiveTab("login"); // Switch to login tab after successful registration
      } else {
        toast({
          title: "Registration Failed",
          description: data.detail || "Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Server Error",
        description: "Unable to reach the server.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center gap-3 mb-4">
            <div className="p-3 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 shadow-lg">
              <Droplets className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                AquaFlow
              </h1>
              <p className="text-sm text-gray-500">Pure Water Delivery</p>
            </div>
          </div>
          <p className="text-gray-600">
            Access your account to order premium water products
          </p>
        </div>

        <Card className="border-0 shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-cyan-500 h-2 w-full"></div>
          <CardHeader className="pb-4">
            <CardTitle className="text-2xl">Welcome Back</CardTitle>
            <CardDescription className="text-gray-600">
              {activeTab === "login" 
                ? "Sign in to continue to your account" 
                : "Create a new account to get started"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs 
              value={activeTab} 
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-2 bg-gray-100">
                <TabsTrigger 
                  value="login" 
                  className="data-[state=active]:bg-white data-[state=active]:shadow-sm"
                >
                  Login
                </TabsTrigger>
                <TabsTrigger 
                  value="register" 
                  className="data-[state=active]:bg-white data-[state=active]:shadow-sm"
                >
                  Register
                </TabsTrigger>
              </TabsList>

              <TabsContent value="login" className="pt-6">
                <form onSubmit={handleLogin} className="space-y-5">
                  <div className="space-y-3">
                    <Label htmlFor="loginEmail" className="flex items-center gap-2 text-gray-700">
                      <Mail className="h-4 w-4" />
                      Email Address
                    </Label>
                    <Input
                      id="loginEmail"
                      type="email"
                      placeholder="you@example.com"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      required
                      className="py-2 h-11"
                    />
                  </div>
                  <div className="space-y-3">
                    <Label htmlFor="loginPassword" className="flex items-center gap-2 text-gray-700">
                      <Lock className="h-4 w-4" />
                      Password
                    </Label>
                    <Input
                      id="loginPassword"
                      type="password"
                      placeholder="Enter your password"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      required
                      className="py-2 h-11"
                    />
                  </div>
                  <div className="flex justify-end">
                    <Link 
                      to="/forgot-password" 
                      className="text-sm text-blue-600 hover:underline"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 h-11"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <span className="flex items-center gap-2">
                        <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Signing in...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        Sign In <ArrowRight className="h-4 w-4" />
                      </span>
                    )}
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="register" className="pt-6">
                <form onSubmit={handleRegister} className="space-y-5">
                  <div className="space-y-3">
                    <Label htmlFor="registerName" className="flex items-center gap-2 text-gray-700">
                      <User className="h-4 w-4" />
                      Full Name
                    </Label>
                    <Input
                      id="registerName"
                      type="text"
                      placeholder="John Doe"
                      value={registerName}
                      onChange={(e) => setRegisterName(e.target.value)}
                      required
                      className="py-2 h-11"
                    />
                  </div>
                  <div className="space-y-3">
                    <Label htmlFor="registerEmail" className="flex items-center gap-2 text-gray-700">
                      <Mail className="h-4 w-4" />
                      Email Address
                    </Label>
                    <Input
                      id="registerEmail"
                      type="email"
                      placeholder="you@example.com"
                      value={registerEmail}
                      onChange={(e) => setRegisterEmail(e.target.value)}
                      required
                      className="py-2 h-11"
                    />
                  </div>
                  <div className="space-y-3">
                    <Label htmlFor="registerPassword" className="flex items-center gap-2 text-gray-700">
                      <Lock className="h-4 w-4" />
                      Password
                    </Label>
                    <Input
                      id="registerPassword"
                      type="password"
                      placeholder="Create a password"
                      value={registerPassword}
                      onChange={(e) => setRegisterPassword(e.target.value)}
                      required
                      className="py-2 h-11"
                    />
                  </div>
                  <div className="space-y-3">
                    <Label htmlFor="confirmPassword" className="flex items-center gap-2 text-gray-700">
                      <Lock className="h-4 w-4" />
                      Confirm Password
                    </Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder="Confirm your password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                      className="py-2 h-11"
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 h-11"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <span className="flex items-center gap-2">
                        <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Creating account...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        Create Account <ArrowRight className="h-4 w-4" />
                      </span>
                    )}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <div className="text-center mt-8 space-y-3">
          <p className="text-sm text-gray-600">
            {activeTab === "login" 
              ? "Don't have an account? " 
              : "Already have an account? "}
            <button 
              onClick={() => setActiveTab(activeTab === "login" ? "register" : "login")}
              className="text-blue-600 hover:underline font-medium"
            >
              {activeTab === "login" ? "Sign up" : "Sign in"}
            </button>
          </p>
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} AquaFlow. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CustomerLogin;