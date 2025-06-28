/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent
} from "@/components/ui/popover"; // or Radix's @radix-ui/react-popover
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

const baseURL = import.meta.env.VITE_BASE_URL;

const NotificationBell = () => {
  const [notifications, setNotifications] = useState([]);
  const token = localStorage.getItem("token");

  const fetchNotifications = async () => {
    try {
      const res = await fetch(`${baseURL}/notifications/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setNotifications(data);
    } catch (err) {
      console.error("Failed to load notifications", err);
    }
  };

  const markAllAsRead = async () => {
    try {
      const res = await fetch(`${baseURL}/notifications/mark-read`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        toast({ title: "All notifications marked as read" });
        fetchNotifications();
      } else {
        const data = await res.json();
        toast({ title: "Error", description: data.detail || "Failed to update" });
      }
    } catch (err) {
      toast({ title: "Error", description: "Could not mark as read" });
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const unreadCount = notifications.filter(n => !n.is_read).length;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="text-blue-600 hover:bg-blue-50 relative"
        >
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
              {unreadCount}
            </span>
          )}
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-80 p-4 bg-white rounded-lg shadow-md z-50">
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-semibold text-gray-800">Notifications</h3>
          {unreadCount > 0 && (
            <Button variant="link" size="sm" onClick={markAllAsRead}>
              Mark all as read
            </Button>
          )}
        </div>

        {notifications.length === 0 ? (
          <p className="text-sm text-gray-500">No notifications</p>
        ) : (
          <ul className="max-h-60 overflow-y-auto space-y-2">
            {notifications.map((note) => (
              <li
                key={note.id}
                className={`p-2 rounded text-sm ${note.is_read ? "text-gray-500" : "text-blue-800 font-medium bg-blue-50"}`}
              >
                {note.message}
              </li>
            ))}
          </ul>
        )}
      </PopoverContent>
    </Popover>
  );
};

export default NotificationBell;
