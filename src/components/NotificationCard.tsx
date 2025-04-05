import { useState } from "react";
import { cn } from "@/lib/utils";
import { Bell, Calendar, FileText, Activity, X } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

interface Notification {
  id: string;
  type: "medical" | "appointment" | "system";
  title: string;
  message: string;
  time: string;
  read: boolean;
}

const NotificationCard = () => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      type: "medical",
      title: "New Test Results",
      message: "Your recent blood test results are now available.",
      time: "2 hours ago",
      read: false,
    },
    {
      id: "2",
      type: "appointment",
      title: "Appointment Reminder",
      message: "You have an appointment with Dr. Smith tomorrow at 10:00 AM.",
      time: "5 hours ago",
      read: false,
    },
    {
      id: "3",
      type: "system",
      title: "System Update",
      message: "HealthChain system will undergo maintenance tonight.",
      time: "1 day ago",
      read: true,
    },
  ]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const getNotificationIcon = (type: Notification["type"]) => {
    switch (type) {
      case "medical":
        return <FileText className="h-4 w-4 text-healthblue-500" />;
      case "appointment":
        return <Calendar className="h-4 w-4 text-healthgreen-500" />;
      case "system":
        return <Activity className="h-4 w-4 text-healthorange-500" />;
    }
  };

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const removeNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-healthorange-500 text-white rounded-full w-4 h-4 text-xs flex items-center justify-center">
              {unreadCount}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <div className="flex items-center justify-between px-4 py-2 border-b">
          <h3 className="font-semibold">Notifications</h3>
          {notifications.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              className="text-xs text-muted-foreground hover:text-foreground"
              onClick={() =>
                setNotifications((prev) =>
                  prev.map((n) => ({ ...n, read: true }))
                )
              }
            >
              Mark all as read
            </Button>
          )}
        </div>
        <div className="py-2 max-h-96 overflow-auto">
          {notifications.length === 0 ? (
            <div className="px-4 py-8 text-center text-sm text-muted-foreground">
              No notifications
            </div>
          ) : (
            notifications.map((notification) => (
              <div
                key={notification.id}
                className={cn(
                  "flex items-start gap-3 px-4 py-3 hover:bg-muted/50 relative group",
                  !notification.read && "bg-muted/30"
                )}
                onClick={() => markAsRead(notification.id)}
              >
                <div className="flex-shrink-0 mt-1">
                  {getNotificationIcon(notification.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm">{notification.title}</p>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {notification.message}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {notification.time}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="opacity-0 group-hover:opacity-100 absolute right-2 top-2"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeNotification(notification.id);
                  }}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))
          )}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NotificationCard;