
import React from 'react';
import { User } from '@/types';
import { mockUsers } from '@/mockData';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';

interface UserSelectorProps {
  selectedUserId: string | null;
  onUserChange: (userId: string | null) => void;
  showAllOption?: boolean;
}

const UserSelector: React.FC<UserSelectorProps> = ({ 
  selectedUserId, 
  onUserChange, 
  showAllOption = true 
}) => {
  const { currentUser } = useAuth();
  
  // For admin, show all users
  // For regular users, only show themselves
  const availableUsers = currentUser?.role === 'admin' 
    ? mockUsers 
    : mockUsers.filter(user => user.id === currentUser?.id);
  
  return (
    <Card className="w-full">
      <CardContent className="p-4">
        <div className="space-y-2">
          <Label htmlFor="userSelect">選擇使用者</Label>
          <Select
            value={selectedUserId || ""}
            onValueChange={(value) => {
              onUserChange(value === "all" ? null : value);
            }}
          >
            <SelectTrigger id="userSelect">
              <SelectValue placeholder="選擇使用者" />
            </SelectTrigger>
            <SelectContent>
              {showAllOption && currentUser?.role === 'admin' && (
                <SelectItem value="all">所有使用者</SelectItem>
              )}
              {availableUsers.map((user) => (
                <SelectItem key={user.id} value={user.id}>
                  {user.name} {user.role === 'admin' ? '(管理者)' : ''}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserSelector;
