
import React, { useState } from 'react';
import { WorkTimeEntry } from '../types';
import { useWorkTime } from '../contexts/WorkTimeContext';
import { formatDate } from '@/utils/dateUtils';
import { useAuth } from '../contexts/AuthContext';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import TimeEntryForm from './TimeEntryForm';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface TimeEntryListProps {
  entries: WorkTimeEntry[];
  title?: string;
}

const TimeEntryList: React.FC<TimeEntryListProps> = ({ 
  entries, 
  title = "工時紀錄列表"
}) => {
  const { deleteWorkTimeEntry } = useWorkTime();
  const { currentUser } = useAuth();
  const [editingEntryId, setEditingEntryId] = useState<string | null>(null);
  
  const canEdit = (entry: WorkTimeEntry) => {
    if (!currentUser) return false;
    return currentUser.role === 'admin' || currentUser.id === entry.userId;
  };

  const handleEdit = (id: string) => {
    setEditingEntryId(id);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('確定要刪除此紀錄嗎？')) {
      deleteWorkTimeEntry(id);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        {entries.length > 0 ? (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>日期</TableHead>
                  <TableHead>工作時數</TableHead>
                  <TableHead>主分類</TableHead>
                  <TableHead>次分類</TableHead>
                  <TableHead>工作描述</TableHead>
                  <TableHead>操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {entries.map((entry) => (
                  <TableRow key={entry.id}>
                    <TableCell>{formatDate(entry.date)}</TableCell>
                    <TableCell>{entry.hours}</TableCell>
                    <TableCell>{entry.mainCategory}</TableCell>
                    <TableCell>{entry.subCategory}</TableCell>
                    <TableCell className="max-w-xs truncate">
                      {entry.description}
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        {canEdit(entry) && (
                          <>
                            <Button 
                              size="sm" 
                              variant="outline" 
                              onClick={() => handleEdit(entry.id)}
                            >
                              編輯
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => handleDelete(entry.id)}
                            >
                              刪除
                            </Button>
                          </>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            無工時紀錄資料
          </div>
        )}
      </CardContent>
      
      <Dialog open={!!editingEntryId} onOpenChange={() => setEditingEntryId(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>編輯工時紀錄</DialogTitle>
          </DialogHeader>
          {editingEntryId && (
            <TimeEntryForm 
              entryId={editingEntryId} 
              onSuccess={() => setEditingEntryId(null)}
            />
          )}
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default TimeEntryList;
