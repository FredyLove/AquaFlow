/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";

const baseURL = import.meta.env.VITE_BASE_URL;

const AccountTab = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({ username: "", email: "" });

  const token = localStorage.getItem("token");

  // Fetch user profile
  const fetchProfile = async () => {
    try {
      const res = await fetch(`${baseURL}/users/profile`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      setUserInfo(data);
      setFormData({ username: data.username, email: data.email });
    } catch (err) {
      toast({ title: "Error", description: "Could not load profile" });
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  // Handle profile update
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${baseURL}/users/${userInfo.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        toast({ title: "Profile updated" });
        setEditing(false);
        fetchProfile();
      } else {
        const data = await res.json();
        toast({ title: "Error", description: data.detail || "Update failed" });
      }
    } catch (err) {
      toast({ title: "Error", description: "Update failed" });
    }
  };

  return (
    <TabsContent value="account" className="space-y-4">
      <h2 className="text-2xl font-bold text-blue-800">Account Information</h2>
      <Card className="border-blue-100">
        <CardHeader>
          <CardTitle className="text-blue-900">Profile Details</CardTitle>
          <CardDescription className="text-blue-600">
            Manage your account information
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!editing ? (
            <>
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-4 border-b border-blue-50">
                  <span className="text-gray-600">Name:</span>
                  <span className="font-medium text-blue-900">{userInfo?.username}</span>
                </div>
                <div className="flex justify-between items-center pb-4 border-b border-blue-50">
                  <span className="text-gray-600">Email:</span>
                  <span className="font-medium text-blue-900">{userInfo?.email}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Account Type:</span>
                  <Badge className="bg-blue-100 text-blue-800">{userInfo?.role}</Badge>
                </div>
              </div>
              <div className="mt-6 space-y-3">
                <Button
                  variant="outline"
                  className="w-full border-blue-200 text-blue-600 hover:bg-blue-50"
                  onClick={() => setEditing(true)}
                >
                  Edit Profile
                </Button>
              </div>
            </>
          ) : (
            <form onSubmit={handleUpdate} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Name</Label>
                <Input
                  id="username"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
              <div className="flex gap-2 pt-4">
                <Button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-700 text-white">
                  Save Changes
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1"
                  onClick={() => setEditing(false)}
                >
                  Cancel
                </Button>
              </div>
            </form>
          )}
        </CardContent>
      </Card>
    </TabsContent>
  );
};

export default AccountTab;
