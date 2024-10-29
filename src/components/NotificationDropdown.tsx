import React, { useState, useEffect, useRef } from 'react';
import { Bell } from 'lucide-react';
import { format } from 'date-fns';

interface Notification {
  id: string;
  message: string;
  timestamp: string;
  read: boolean;
}

interface NotificationDropdownProps {
  notifications: Notification[];
  onMarkAsRead: (id: string) => void;
}

const NotificationDropdown: React.FC<NotificationDropdownProps> = ({
  notifications,
  onMarkAsRead,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 relative"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Bell className="h-6 w-6 text-gray-600" />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-600 transform translate-x-1/2 -translate-y-1/2"></span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg p-4 border border-gray-200 z-50">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-gray-900">Notifications</h3>
            {unreadCount > 0 && (
              <span className="text-xs text-gray-500">{unreadCount} unread</span>
            )}
          </div>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {notifications.length > 0 ? (
              notifications.map(notification => (
                <div
                  key={notification.id}
                  className={`p-3 rounded-md cursor-pointer transition-colors ${
                    notification.read ? 'bg-white' : 'bg-blue-50'
                  }`}
                  onClick={() => {
                    if (!notification.read) {
                      onMarkAsRead(notification.id);
                    }
                  }}
                >
                  <p className="text-sm text-gray-800">{notification.message}</p>
                  <span className="text-xs text-gray-500">
                    {format(new Date(notification.timestamp), 'MMM d, h:mm a')}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500 text-center py-4">
                No notifications
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationDropdown;