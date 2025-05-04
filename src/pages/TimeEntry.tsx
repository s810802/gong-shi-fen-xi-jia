
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import TimeEntryForm from '@/components/TimeEntryForm';
import TimeEntryList from '@/components/TimeEntryList';
import { useWorkTime } from '@/contexts/WorkTimeContext';
import { useAuth } from '@/contexts/AuthContext';
import DateRangeSelector from '@/components/DateRangeSelector';
import { getCurrentMonthRange } from '@/utils/dateUtils';
import UserSelector from '@/components/UserSelector';

const TimeEntry = () => {
  const { currentUser } = useAuth();
  const { getFilteredEntries } = useWorkTime();
  const initialDateRange = getCurrentMonthRange();
  
  const [startDate, setStartDate] = useState(initialDateRange.start);
  const [endDate, setEndDate] = useState(initialDateRange.end);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(
    currentUser?.id || null
  );
  
  const isAdmin = currentUser?.role === 'admin';
  const userId = selectedUserId || currentUser?.id;
  
  const entries = getFilteredEntries(
    startDate,
    endDate,
    userId || undefined
  );
  
  const handleDateRangeChange = (start: string, end: string) => {
    setStartDate(start);
    setEndDate(end);
  };
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">工時輸入與管理</h1>
        
        <div className="grid grid-cols-1 gap-6">
          <TimeEntryForm />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <DateRangeSelector
              startDate={startDate}
              endDate={endDate}
              onRangeChange={handleDateRangeChange}
            />
            
            {isAdmin && (
              <UserSelector
                selectedUserId={selectedUserId}
                onUserChange={setSelectedUserId}
                showAllOption={false}
              />
            )}
          </div>
          
          <TimeEntryList entries={entries} />
        </div>
      </div>
    </Layout>
  );
};

export default TimeEntry;
