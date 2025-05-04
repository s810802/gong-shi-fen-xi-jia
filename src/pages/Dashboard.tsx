
import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { useWorkTime } from '@/contexts/WorkTimeContext';
import { useAuth } from '@/contexts/AuthContext';
import { getCurrentMonthRange } from '@/utils/dateUtils';
import DateRangeSelector from '@/components/DateRangeSelector';
import WorkTimeChart from '@/components/WorkTimeChart';
import UserSelector from '@/components/UserSelector';
import DashboardSummary from '@/components/DashboardSummary';
import { mockUsers } from '@/mockData';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Dashboard = () => {
  const { currentUser } = useAuth();
  const { getFilteredEntries } = useWorkTime();
  const initialDateRange = getCurrentMonthRange();
  
  const [startDate, setStartDate] = useState(initialDateRange.start);
  const [endDate, setEndDate] = useState(initialDateRange.end);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(
    currentUser?.role === 'admin' ? null : currentUser?.id || null
  );
  
  const [entries, setEntries] = useState(getFilteredEntries(startDate, endDate, selectedUserId || undefined));
  
  // Update entries when filters change
  useEffect(() => {
    setEntries(getFilteredEntries(startDate, endDate, selectedUserId || undefined));
  }, [startDate, endDate, selectedUserId, getFilteredEntries]);
  
  const handleDateRangeChange = (start: string, end: string) => {
    setStartDate(start);
    setEndDate(end);
  };
  
  // Get user name for display
  const getUserName = () => {
    if (!selectedUserId) return '所有使用者';
    const user = mockUsers.find(user => user.id === selectedUserId);
    return user ? user.name : '';
  };
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">工時分析儀表板</h1>
        
        <div className="grid grid-cols-1 gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <DateRangeSelector
              startDate={startDate}
              endDate={endDate}
              onRangeChange={handleDateRangeChange}
            />
            
            {currentUser && (
              <UserSelector
                selectedUserId={selectedUserId}
                onUserChange={setSelectedUserId}
              />
            )}
          </div>
          
          <DashboardSummary
            entries={entries}
            startDate={startDate}
            endDate={endDate}
            userName={getUserName()}
          />
          
          <Tabs defaultValue="main-category" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="main-category">依主分類分析</TabsTrigger>
              <TabsTrigger value="sub-category">依次分類分析</TabsTrigger>
            </TabsList>
            
            <TabsContent value="main-category">
              <WorkTimeChart
                entries={entries}
                title="主分類工時分析"
                groupBy="mainCategory"
              />
            </TabsContent>
            
            <TabsContent value="sub-category">
              <WorkTimeChart
                entries={entries}
                title="次分類工時分析"
                groupBy="subCategory"
              />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
