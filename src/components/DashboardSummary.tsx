
import React from 'react';
import { WorkTimeEntry } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatDate } from '@/utils/dateUtils';

interface DashboardSummaryProps {
  entries: WorkTimeEntry[];
  startDate: string;
  endDate: string;
  userName?: string;
}

const DashboardSummary: React.FC<DashboardSummaryProps> = ({
  entries,
  startDate,
  endDate,
  userName,
}) => {
  const totalHours = entries.reduce((sum, entry) => sum + entry.hours, 0);
  const uniqueDays = new Set(entries.map(entry => entry.date)).size;
  const totalEntries = entries.length;
  
  // Calculate hours by main category
  const hoursByCategory = entries.reduce((acc: Record<string, number>, entry) => {
    if (!acc[entry.mainCategory]) {
      acc[entry.mainCategory] = 0;
    }
    acc[entry.mainCategory] += entry.hours;
    return acc;
  }, {});
  
  // Find most common category
  let mostCommonCategory = '';
  let maxHours = 0;
  
  Object.entries(hoursByCategory).forEach(([category, hours]) => {
    if (hours > maxHours) {
      mostCommonCategory = category;
      maxHours = hours;
    }
  });
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>工時摘要報告</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-sm text-muted-foreground mb-4">
          {userName ? `${userName} - ` : ''}
          {formatDate(startDate)} 至 {formatDate(endDate)}
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="font-medium text-blue-800">總工作時數</div>
            <div className="text-2xl font-bold">{totalHours}</div>
            <div className="text-sm text-blue-600">小時</div>
          </div>
          
          <div className="bg-green-50 p-4 rounded-lg">
            <div className="font-medium text-green-800">工作天數</div>
            <div className="text-2xl font-bold">{uniqueDays}</div>
            <div className="text-sm text-green-600">天</div>
          </div>
          
          <div className="bg-purple-50 p-4 rounded-lg">
            <div className="font-medium text-purple-800">工時紀錄筆數</div>
            <div className="text-2xl font-bold">{totalEntries}</div>
            <div className="text-sm text-purple-600">筆</div>
          </div>
          
          <div className="bg-amber-50 p-4 rounded-lg">
            <div className="font-medium text-amber-800">主要工作類別</div>
            <div className="text-xl font-bold truncate">{mostCommonCategory || '無數據'}</div>
            <div className="text-sm text-amber-600">
              {maxHours > 0 ? `${maxHours} 小時 (${((maxHours/totalHours)*100).toFixed(0)}%)` : ''}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DashboardSummary;
